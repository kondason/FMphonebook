const express = require('express');
const userBL = require('../BL/userBL');

const router = express.Router();

router.post('/GetUserByID', (async (req, res) =>
{
    try
    {
        const result = await userBL.GetUserByID(req.body.UserID);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/GetUsersByParameters', (async (req, res) =>
{
    try
    {
        const result = await userBL.GetUsersByParameters(
                                                            req.body.Name,
                                                            req.body.Email,
                                                            req.body.ProfessionID,
                                                            req.body.ClubID,
                                                            req.body.TeamAgeID,
                                                            req.body.EmploymentStatusID
                                                        );

        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/CreateUser', (async (req, res) =>
{
    try
    {
        const result = await userBL.CreateUser(req.body.UserDetails);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.delete('/DeleteUser', (async (req, res) =>
{
    try
    {
        const result = await userBL.DeleteUser(req.body.RequestedUserID, req.body.UserID);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.put('/UpdateUser', (async (req, res) =>
{
    try
    {
        const result = await userBL.UpdateUser(req.body.RequestedUserID, req.body.UserDetails);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/IsEmailExists',(async (req, res)=>
{
    try
    {
        const result = await userBL.IsEmailExists(req.body.Email);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));


router.post('/GetUserByLoginTypeObjectID', (async (req, res) =>
{
    try
    {
        const result = await userBL.GetUserByLoginTypeObjectID(req.body.LoginTypeObjectID);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/UpdateUserURLImage', (async (req, res) =>
{
    try
    {
        const result = await userBL.UpdateUserURLImage(req.body.UserID,req.body.ImageURL);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/UpdateLoginTypeObjectID', (async (req, res) =>
{
    try
    {
        const result = await userBL.UpdateLoginTypeObjectID(req.body.LoginTypeID,req.body.LoginTypeObjectID,req.body.UserID);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/GetUserIDByEmail', (async (req, res) =>
{
    try
    {
        const result = await userBL.GetUserIDByEmail(req.body.Email);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

router.post('/GetUserIDAndPassByEmail', (async (req, res) =>
{
    try
    {
        const result = await userBL.GetUserIDAndPassByEmail(req.body.Email);
        return res.status(result.Status).json(result);
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

module.exports = router;