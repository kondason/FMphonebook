const jtw = require('jsonwebtoken');
require('dotenv').config();

const CreateJTWToken = (userID) =>
{
    try
    {
        const payload =
        {
            sub: userID,
            iat: Date.now()
        };

        const signOptions =
        {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        };

        const signedToken = jtw.sign(payload, process.env.JWT_SECRET_KEY, signOptions);
        return signedToken;
    } catch (error)
    {
        throw error;
    }
};

module.exports =
{
    CreateJTWToken
}