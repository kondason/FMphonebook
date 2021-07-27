const express = require('express');
const postsBL = require('../BL/postsBL.js');
const professionsBL = require('../BL/professionsBL');
const clubsBL = require('../BL/clubsBL');
const usersBL = require('../BL/usersBL');
const teamAgesBL = require('../BL/teamAgesBL');
const employmentStatusesBL = require('../BL/employmentStatusesBL');


const router = express.Router();

router.post('/edit/:id', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            const result = await usersBL.UpdateUser(req.body, req.params.id, req.user.UserID);
            res.status(result.Status).json(result);
        } else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        console.log('2');
        res.status(500).json({ "err": error.message });
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            const userDetails = await usersBL.GetUserByID(req.params.id, req.user.UserID);
            const employmentStatuses = await employmentStatusesBL.GetEmploymentStatuses();
            const professions = await professionsBL.GetProfessions();
            const clubs = await clubsBL.GetClubs();
            const teamAges = await teamAgesBL.GetTeamAges();

            console.log({
                UserDetails: userDetails,
                professions: professions.Data,
                clubs: clubs.Data,
                employmentStatuses: employmentStatuses.Data,
                teamAges: teamAges.Data
            });
            
            res.status(200).render('profile', {
                "user": req.user, "Data": {
                    UserDetails: userDetails,
                    professions: professions.Data,
                    clubs: clubs.Data,
                    employmentStatuses: employmentStatuses.Data,
                    teamAges: teamAges.Data
                }
            });
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});

router.get('/', async (req, res) =>
{
    try
    {
        const professions = await professionsBL.GetProfessions();
        const clubs = await clubsBL.GetClubs();
        const employmentStatuses = await employmentStatusesBL.GetEmploymentStatuses();
        const teamAges = await teamAgesBL.GetTeamAges();
        const searchResults = await usersBL.GetUsersByParameters();

        if (req.isAuthenticated())
        {
            res.status(200).render('search', {
                "user": req.user, "Data": {
                    Source: "Users",
                    SearchFormData: {
                        professions: professions.Data,
                        clubs: clubs.Data,
                        employmentStatuses: employmentStatuses.Data,
                        teamAges: teamAges.Data,
                        actionURL: "/Users/search"
                    },
                    SearchResults: searchResults.Data
                }
            });
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});


module.exports = router;