const express = require('express');

const router = express.Router();

router.get('/', (async (req, res) =>
{
    try
    {

        if (req.isAuthenticated())
        {
            res.status(200).render('terms', {
                "user": req.user, "Data": {
                    Source: "Terms",
                    IsAuth: true
                }

            });
        }
        else
        {
            res.status(200).render('terms', {
                "user": req.user, "Data": {
                    Source: "Terms",
                    IsAuth: false
                }

            });
        }
    } catch (error)
    {
        res.status(500).json({ "err": error });
    }
}));

module.exports = router;