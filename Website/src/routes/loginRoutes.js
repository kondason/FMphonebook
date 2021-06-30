const express = require('express');
const passport = require('passport');
require('../Helpers/authenticationHelper');

const { LocalEmailAndPasswordLogin, LoginValidatorResult } = require('../middleware/validators/loginValidator');

const router = express.Router();


router.get('/', (async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            res.redirect('/');
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

router.post('/',LocalEmailAndPasswordLogin, LoginValidatorResult ,passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));



module.exports = router;