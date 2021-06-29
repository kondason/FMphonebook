const express = require('express');

const router = express.Router();


router.get('/', (async (req, res) =>
{
    try
    {
        res.render("login");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));


module.exports = router;