const express = require('express');
const postsBL = require('../BL/postsBL');

const router = express.Router();

router.get('/GetPosts',(async (req, res)=>
{
    try
    {
        
        const result = await postsBL.GetPosts();        
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

router.get('/GetPostTypes',(async (req, res)=>
{
    try
    {
        
        const result = await postsBL.GetPostTypes();        
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));


router.post('/AddPost',(async (req, res)=>
{
    try
    {   
        const result = await postsBL.AddPost(req.body.UserID,req.body.PostTypeID,req.body.Body);        
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

module.exports = router;