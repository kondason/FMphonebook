const express = require('express');
const teamAgesBL = require('../BL/teamAgesBL');

const router = express.Router();


router.get('/GetTeamAges',(async (req, res)=>
{
    try
    {
        const result = await teamAgesBL.GetTeamAges();
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));


module.exports = router;