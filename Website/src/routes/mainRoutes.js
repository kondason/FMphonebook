const express = require('express');
const jwtHelper = require('../Helpers/jwtHelper');

const router = express.Router();

router.get('/', (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            const token = jwtHelper.CreateJTWToken(req.user.UserID)
            res.status(200).render('index', { "token": token });
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});

router.get('/logout', (req, res) =>
{
    try
    {
        req.logOut();
        res.redirect('/');
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});

module.exports = router;