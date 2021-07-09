const express = require('express');
const employmentStatusBL = require('../BL/employmentStatusBL');

const router = express.Router();


router.get('/GetEmploymentStatuses',(async (req, res)=>
{
    try
    {
        const result = await employmentStatusBL.GetEmploymentStatuses();
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));


module.exports = router;