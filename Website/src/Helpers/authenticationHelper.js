require('dotenv').config();
var _ = require('lodash');

const registerBL = require('../BL/registerBL');
const usersBL = require('../BL/usersBL');
const imageHelper = require('../Helpers/imageHelper');
const passwordHelper = require('../Helpers/passwordHelper');

const passport = require('passport');

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
            const result = await usersBL.GetUserIDAndPassByEmail(email);

            if (!result)
                return done(null, false, { message: "email or password is incorrect" });

            if (await passwordHelper.ComparePassword(password, result.Password)) //check if passwords match
                return done(null, result); //Successfully logged in
            else
                return done(null, false, { message: 'email or password is incorrect' }); //Email exists but password not matched

        } catch (error)
        {
            done(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:4000/auth/facebook/callback",
    profileFields: ['first_name,last_name,picture.type(large),birthday,email,gender']
},
    async function (accessToken, refreshToken, profile, done)
    {
        try
        {
            //check if user was create by this login type
            let responseData = await usersBL.GetUserByLoginTypeObjectID(profile.id);
            let userObject = responseData[0][0];

            if (userObject)
            {
                return done(null, userObject);
            }

            let userBirthday = new Date(profile._json.birthday).toLocaleDateString("af-ZA");
            console.log(userBirthday);

            //check if user was create by this login type
            const response = await registerBL.CreateUser(2, profile.id, profile._json.email, null, profile._json.first_name, profile._json.last_name, userBirthday, null, null, null, null);

            if (response.Status == 500)
            {
                const userID = await usersBL.GetUserIDByEmail(profile._json.email);
                await usersBL.UpdateLoginTypeObjectID(3, profile.id, userID);

                response.Data = userID;
            }
            //user were not exists, update his photo with the login type
            else
            {
                const imageStream = await imageHelper.GetImageFromURL(profile.photos[0].value);
                const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, response.Data);

                await usersBL.UpdateUserURLImage(userImageURL, response.Data);
            }

            userObject = { "UserID": response.Data };

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
    callbackURL: "https://localhost:4000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done)
    {
        try
        {
            //check if user was create by this login type
            let responseData = await usersBL.GetUserByLoginTypeObjectID(profile.id);
            let userObject = responseData[0][0];

            if (userObject)
            {
                return done(null, userObject);
            }

            //if user not exists with that login type, try to create it
            const response = await registerBL.CreateUser(3, profile.id, profile._json.email, null, profile._json.given_name, profile._json.family_name, null, null, null, null, null);

            //user exists with different login type
            if (response.Status == 500)
            {
                const userID = await usersBL.GetUserIDByEmail(profile._json.email);
                await usersBL.UpdateLoginTypeObjectID(3, profile.id, userID);

                response.Data = userID;
            }
            //user were not exists, update his photo with the login type
            else
            {
                const imageStream = await imageHelper.GetImageFromURL(profile._json.picture);
                const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, response.Data);

                await usersBL.UpdateUserURLImage(userImageURL, response.Data);
            }

            userObject = { "UserID": response.Data };

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
        done(null, user.UserID);
    } catch (error)
    {
        done(error);
    }
});

passport.deserializeUser(async function (id, done)
{
    try
    {
        const userObject = await usersBL.GetUserByID(id);
        userObject.FirstName = _.capitalize(userObject.FirstName);
        userObject.LastName = _.capitalize(userObject.LastName);

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