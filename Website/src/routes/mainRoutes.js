const express = require('express');

const router = express.Router();

router.get('/', (req, res) =>
{
    try
    {
        res.send("facebook");
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
});


module.exports = router;