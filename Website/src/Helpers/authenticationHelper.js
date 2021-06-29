require('dotenv').config();
const date = require('date-and-time');

const registerBL = require('../BL/registerBL');
const usersBL = require('../BL/usersBL');
const imageHelper = require('../Helpers/imageHelper');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
            let responseData = await usersBL.GetUserByLoginTypeObjectID(profile.id);
            let userObject = responseData[0][0];

            if (userObject)
            {
                return done(null, userObject);
            }

            let userBirthday = date.parse(profile._json.birthday, 'DD/MM/YYYY');
            userBirthday = date.format(userBirthday, 'YYYY-MM-DD');

            const userID = await registerBL.CreateUser(2, profile.id, profile._json.email, null, profile._json.first_name, profile._json.last_name, userBirthday, null, null, null, null);

            const imageStream = await imageHelper.GetImageFromURL(profile.photos[0].value);
            const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, userID.Data);

            await usersBL.UpdateUserURLImage(userImageURL, userID.Data);

            userObject = { "UserID": userID.Data };

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
            console.log(profile);

            let responseData = await usersBL.GetUserByLoginTypeObjectID(profile.id);
            let userObject = responseData[0][0];

            if (userObject)
            {
                return done(null, userObject);
            }

            const userID = await registerBL.CreateUser(3, profile.id, profile._json.email, null, profile._json.given_name, profile._json.family_name, null, null, null, null, null);

            const imageStream = await imageHelper.GetImageFromURL(profile._json.picture);
            const userImageURL = await imageHelper.SaveUserImageFromStreamReturnURL(imageStream, userID.Data);

            await usersBL.UpdateUserURLImage(userImageURL, userID.Data);

            userObject = { "UserID": userID.Data };

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