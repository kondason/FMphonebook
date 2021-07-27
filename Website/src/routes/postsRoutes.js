const express = require('express');
const postsBL = require('../BL/postsBL');


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            const posts = await postsBL.GetPosts();
            const postTypes = await postsBL.GetPostTypes();

            res.status(200).render('posts', {
                "user": req.user, Data: {
                    Source: "Posts",
                    Posts:posts.Data,
                    PostTypes: postTypes
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

router.post('/addPost', async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            
            postsBL.AddPost(req.user.UserID, req.body.PostTypeID, req.body.PostBody);

            if (req.body.Source=="Posts")
                res.status(200).redirect('/Posts');
            else
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