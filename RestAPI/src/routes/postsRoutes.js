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

module.exports = router;