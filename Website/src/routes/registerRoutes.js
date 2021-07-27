const express = require('express');
const registerBL = require('../BL/registerBL');
const clubsBL = require('../BL/clubsBL');
const professionsBL = require('../BL/professionsBL');
const { UserPasswordRegValidatorMiddleware, RegisterValidatorResult } = require('../middleware/validators/registerValidator');

const router = express.Router();

router.get('/', (async (req, res) =>
{
    try
    {

        if (req.isAuthenticated())
            res.redirect('index');
        else
        {
            
            const professions = await professionsBL.GetProfessions();
            const clubs = await clubsBL.GetClubs();

            res.render("register", { "Professions": professions.Data, "Clubs": clubs.Data, "Errors": [], "OldInputs": "" });
        }
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));


router.post('/', UserPasswordRegValidatorMiddleware, RegisterValidatorResult, (async (req, res) =>
{
    try
    {
        const response = await registerBL.CreateUser(
            1,
            null,
            req.body.Email,
            req.body.Password,
            req.body.FirstName,
            req.body.LastName,
            null,
            req.body.ProfessionID,
            req.body.ProfessionOther,
            req.body.ClubID,
            req.body.ClubOther
        );

        res.redirect("/");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

module.exports = router;