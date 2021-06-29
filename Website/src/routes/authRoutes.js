const express = require('express');
const passport = require('passport');
require('../Helpers/authenticationHelper');
const router = express.Router();

router.get('/', (async (req, res) =>
{
    try
    {
        res.render("login");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

/*
    Basically we can pass the router a function , so we can pass a function or create a function.
*/

//Facebook Auth By Passport
router.get('/facebook', passport.authenticate('facebook',{ scope : 'user_birthday,public_profile,user_gender,email' }));
router.get("/facebook/callback",passport.authenticate("facebook", {successRedirect: "/auth/facebook/succ",failureRedirect: "/auth/google/fail"}));
router.get('/fail', (async (req, res) =>
{
    try
    {
        res.send("fail");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));
router.get('/facebook/succ', (async (req, res) =>
{
    try
    {
        res.send(`fsafsa`);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

//Google Auth By Passport
router.get('/google', passport.authenticate('google',{ scope : ['profile','email','https://www.googleapis.com/auth/user.birthday.read'] }));
router.get("/google/callback",passport.authenticate("google", {successRedirect: "/auth/google/succ",failureRedirect: "/auth/google/fail"}));
router.get('/fail', (async (req, res) =>
{
    try
    {
        res.send("fail");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));
router.get('/google/succ', (async (req, res) =>
{
    try
    {
        res.send(`fsafsa`);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

module.exports = router;