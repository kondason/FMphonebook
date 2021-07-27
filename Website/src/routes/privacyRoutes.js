const express = require('express');

const router = express.Router();

router.get('/', (async (req, res) =>
{
    try
    {
        if (req.isAuthenticated())
        {
            res.status(200).render('privacy', {
                "user": req.user, "Data": {
                    Source: "Privacy",
                    IsAuth: true
                }

            });
        }
        else
        {
            res.status(200).render('privacy', {
                "user": req.user, "Data": {
                    Source: "Privacy",
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