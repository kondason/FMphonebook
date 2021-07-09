const express = require('express');
const professionsBL = require('../BL/professionsBL');

const router = express.Router();


router.get('/GetProfessions',(async (req, res)=>
{
    try
    {
        const result = await professionsBL.GetProfessions();
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));


router.post('/CreateProfession',(async (req, res)=>
{
    try
    {
        const result = await professionsBL.CreateProfession(req.body.ProfessionName);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));



module.exports = router;