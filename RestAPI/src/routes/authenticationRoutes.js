const express = require('express');
const authenticationBL = require('../BL/authenticationBL');

const router = express.Router();


router.post('/AuthenticateUser',(async (req, res)=>
{
    try
    {
        const result = await authenticationBL.AuthenticateUser(req.body.LoginTypeID,req.body.Email,req.body.Password);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));


module.exports = router;