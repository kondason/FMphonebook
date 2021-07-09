const express = require('express');
const postsBL = require('../BL/postsBL');


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            res.status(200).render('posts', { "user": req.user });
        }
        else
            res.render("login", { "Errors": [], "OldInputs": "" });
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});

router.post('/addpost', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            postsBL.AddPost(req.user.UserID, req.body.PostTypeID, req.body.PostBody);

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