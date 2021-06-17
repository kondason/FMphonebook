const express = require('express');
const userBL = require('../BL/userBL');

const router = express.Router();

router.post('/AddUser', (async (req, res) =>
{
    const result = await userBL.GetUsers();
    console.log(result);
    return res.json({ "lala": "lala" });
}));

module.exports = router;