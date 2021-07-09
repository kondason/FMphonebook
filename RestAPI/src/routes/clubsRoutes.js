const express = require('express');
const clubsBL = require('../BL/clubsBL');

const router = express.Router();


router.get('/GetClubs',(async (req, res)=>
{
    try
    {
        const result = await clubsBL.GetClubs();
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

router.post('/CreateClub',(async (req, res)=>
{
    try
    {
        const result = await clubsBL.CreateClub(req.body.ClubName);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));



module.exports = router;