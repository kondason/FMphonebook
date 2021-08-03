require('dotenv').config();
const logger = require('./utils');
var _ = require('lodash');


const registerBL = require('../BL/registerBL');
const usersBL = require('../BL/usersBL');
const authenticationBL = require('../BL/authenticationBL');
const imageHelper = require('../Helpers/imageHelper');
const passport = require('passport');

const axiosConfig = require('../Config/axios');


//Social Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Local Strategy
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password'
},
    async function (email, password, done)
    {
        try
        {
            
            const result = await authenticationBL.AuthenticateUser(1,email, password);
            
            axiosConfig.SetDefaultTokenForRequests(result.Data.token);

            if (result.Data.status)
                return done(null, { token: result.Data.token, UserID: result.Data.userID }); //Successfully logged in

            return done(null, false, { message: 'email or password is incorrect' });
        } catch (error)
        {
            done(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URI,
    profileFields: ['first_name,last_name,picture.type(large),birthday,email,gender']
},
    async function (accessToken, refreshToken, profile, done)
    {
        try
        {
            //check if user was create by this login type
            const responseData = await authenticationBL.AuthenticateUser(2, profile._json.email, profile.id);

            if (responseData.Data.status)
            {
                return done(null, { token: responseData.Data.token, UserID: responseData.Data.userID }); //Successfully logged in
            }

            let userBirthday = new Date(profile._json.birthday).toLocaleDateString("af-ZA");

            //check if user was create by this login type
            const createResponse = await registerBL.CreateUser(2, profile.id, profile._json.email, null, profile._json.first_name, profile._json.last_name, userBirthday, null, null, null, null);
            let userObject = '';

            const result = await authenticationBL.AuthenticateUser(2, profile._json.email, profile.id);
            userObject = { token: result.Data.token, UserID: result.Data.userID }; //Successfully logged in

            axiosConfig.SetDefaultTokenForRequests(result.Data.token);


            if (createResponse.Data.status)
            {
                const imageStream = await imageHelper.GetImageFromURL(profile.photos[0].value);
                const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, createResponse.Data.userID);
                await usersBL.UpdateUserURLImage(userImageURL, createResponse.Data.userID);
            }
            else
            {
                await usersBL.UpdateLoginTypeObjectID(2, profile.id, profile._json.email);
            }

            return done(null, userObject);
        } catch (error)
        {
            return done(error);
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI
},
    async function (accessToken, refreshToken, profile, done)
    {
        try
        {
            //check if user was create by this login type
            const responseData = await authenticationBL.AuthenticateUser(3, profile._json.email, profile.id);

            if (responseData.Data.status)
            {
                return done(null, { token: responseData.Data.token, UserID: responseData.Data.userID }); //Successfully logged in
            }

            //if user not exists with that login type, try to create it
            const createResponse = await registerBL.CreateUser(3, profile.id, profile._json.email, null, profile._json.given_name, profile._json.family_name, null, null, null, null, null);
            let userObject = '';

            const result = await authenticationBL.AuthenticateUser(3, profile._json.email, profile.id);
            userObject = { token: result.Data.token, UserID: result.Data.userID }; //Successfully logged in

            axiosConfig.SetDefaultTokenForRequests(result.Data.token);

            

            //user exists with different login type
            if (createResponse.Data.status)
            {
                const imageStream = await imageHelper.GetImageFromURL(profile.photos[0].value);
                const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, createResponse.Data.userID);
                await usersBL.UpdateUserURLImage(userImageURL, createResponse.Data.userID);
            }
            else
            {
                await usersBL.UpdateLoginTypeObjectID(3, profile.id, profile._json.email);
            }

            return done(null, userObject);
        } catch (error)
        {
            return done(error);
        }
    }
));

passport.serializeUser(function (user, done)
{
    try
    {
        done(null, user);
    } catch (error)
    {
        done(error);
    }
});

passport.deserializeUser(async function (user, done)
{
    try
    {
        axiosConfig.SetDefaultTokenForRequests(user.token);
        const userObject = await usersBL.GetUserByID(user.UserID);
        userObject.FirstName = _.capitalize(userObject.FirstName);
        userObject.LastName = _.capitalize(userObject.LastName);
        userObject.token = user.token;

        return done(null, userObject)
    } catch (error)
    {
        return done(error);
    }
});


/*
1. we have to init passport by passport.initialize() in app.js
2. in order that passport to manage sessions (let the user stay logged in) we have to use passport.session()
3. we have to set serializeUser and deserializeUser

what is the flow:

1. user request the login path
2. passport.authenticate + strategy has been called. EX- router.get('/facebook', passport.authenticate('facebook',{ scope : 'user_birthday,public_profile,user_gender,email' }));
3. passport will be looked the Implementation for the strategy that been called, and will try to verify the user. EX - passport.use(new FacebookStrategy({},how to verify users)
4. in this verify function we have to return done(null,user (to serialize)) in case of succ or done(null, false) when we cant auth the user, we will return done(err) when we have error.
5. in the next step (when every the user has been authenticate) the passport.serializeUser will be invoked. in there we will have to defined which of the user data (that we pass earlier
    in the verify function) will be stored in the session object / cookies. [req.session.passport.user] && req.user

what happen in the next time the user will access our website?

1. express loads the session data and attaches it to the req object.
2. passport init will try to find the user in the session, if it dosent the user in not authenticated yet. if he dose passport will create req.passport.user = {} empty object.
3. passport.deserializeUser is invoked. we will there have to get the user data from our DB by the ID we set in the session(in the serializeUser process).
   and return the data that we want to store in the req object. req.user
4. once down, on every request we will be able to use those functions:

req.isAuthenticated()
req.isUnAuthenticated()


**** passport.deserializeUser we will invoked for every request (if the user is authenticate).

*/