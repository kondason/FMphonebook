const express = require('express');
const registerBL = require('../BL/registerBL');

const router = express.Router();


router.get('/', (async (req, res) =>
{
    try
    {
        const professions = await registerBL.GetProfessions();
        const clubs = await registerBL.GetClubs();

        res.render("register", { "Professions": professions.Data, "Clubs": clubs.Data });
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));


router.post('/CreateUser', (async (req, res) =>
{
    try
    {
        const response = await registerBL.CreateUser(
            req.body.Email,
            req.body.Password,
            req.body.FirstName,
            req.body.LastName,
            req.body.ProfessionID,
            req.body.ProfessionOther,
            req.body.ClubID,
            req.body.ClubOther
        );
        res.send("created");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

module.exports = router;