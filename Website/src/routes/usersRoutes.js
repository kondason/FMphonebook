const express = require('express');
const usersBL = require('../BL/usersBL');

const router = express.Router();


router.post('/search', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            usersBL.AddPost(
                            req.user.Name,
                            req.body.Email,
                            req.body.ProfessionID,
                            req.body.ClubID,
                            req.body.TeamAgeID,
                            req.body.EmploymentStatusID,
                            );

            res.status(200).redirect('/');
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});

module.exports = router;