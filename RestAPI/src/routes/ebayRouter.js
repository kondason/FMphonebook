const express = require('express');

const router = express.Router();

router.get('/MarketplaceAccountDeletion',(async (req, res)=>
{
    try
    {
        const hash = createHash('sha256');
        hash.update(req.body.challenge_code);
        hash.update('aabbccddaabbccddeeffggabcde0123456');
        hash.update('https://fmphonebook.com/ebay/MarketplaceAccountDeletion');
        const responseHash = hash.digest('hex');
        
        response = {"challengeResponse":new Buffer.from(responseHash).toString()};

        return res.status(result.Status).json(response);
    } catch (error)
    {
        res.status(500).json({ "err": error.message });
    }
}));

module.exports = router;