const express = require('express');
const passport = require('passport');
require('../Helpers/authenticationHelper');

const { SocialLoginValidatorMiddleware, LoginValidatorResult } = require('../middleware/validators/loginValidator');

const router = express.Router();


router.get('/', (async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
            res.redirect('index');
        else
            res.redirect("login");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

/*
    Basically we can pass the router a function , so we can pass a function or create a function.
*/

//Facebook Auth By Passport
router.get('/facebook', passport.authenticate('facebook', { scope: 'user_birthday,public_profile,user_gender,email' }));
router.get("/facebook/callback", passport.authenticate("facebook", { successRedirect: "/", failureRedirect: "/login" }));

//Google Auth By Passport
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read'] }));
router.get("/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }));

module.exports = router;