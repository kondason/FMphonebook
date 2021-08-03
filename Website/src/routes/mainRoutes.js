const express = require('express');
const postsBL = require('../BL/postsBL.js');
const professionsBL = require('../BL/professionsBL');
const clubsBL = require('../BL/clubsBL');
const teamAgesBL = require('../BL/teamAgesBL');
const employmentStatusesBL = require('../BL/employmentStatusesBL');
const usersBL = require('../BL/usersBL');

const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
        
            const posts = await postsBL.GetPosts(10);
            const postTypes = await postsBL.GetPostTypes();
            const professions = await professionsBL.GetProfessions();
            const clubs = await clubsBL.GetClubs();
            const employmentStatuses = await employmentStatusesBL.GetEmploymentStatuses();
            const teamAges = await teamAgesBL.GetTeamAges();

            res.status(200).render('index', {
                "user": req.user,
                Data: {
                    Source: "Home",
                    Posts: posts.Data,
                    PostTypes: postTypes,
                    SearchFormData: {
                        professions: professions.Data,
                        clubs: clubs.Data,
                        employmentStatuses: employmentStatuses.Data,
                        teamAges: teamAges.Data,
                        actionURL: "/Search"
                    },
                    SearchResults: "start"
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

router.post('/Search', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            const searchResults = await usersBL.GetUsersByParameters(req.body.Name, req.body.Email, req.body.ProfessionID, req.body.ClubID, req.body.TeamAgeID, req.body.EmploymentStatusID);
            const posts = await postsBL.GetPosts(10);
            const postTypes = await postsBL.GetPostTypes();
            const professions = await professionsBL.GetProfessions();
            const clubs = await clubsBL.GetClubs();
            const employmentStatuses = await employmentStatusesBL.GetEmploymentStatuses();
            const teamAges = await teamAgesBL.GetTeamAges();

            res.status(200).render('index', {
                "user": req.user,
                Data: {
                    Posts: posts.Data,
                    PostTypes: postTypes,
                    SearchFormData: {
                        professions: professions.Data,
                        clubs: clubs.Data,
                        employmentStatuses: employmentStatuses.Data,
                        teamAges: teamAges.Data
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