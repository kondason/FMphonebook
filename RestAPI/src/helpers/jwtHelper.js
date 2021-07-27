const jwt = require('jsonwebtoken');
require('dotenv').config();

const CreateJTWToken = (userID) =>
{
    try
    {
        console.log(userID);
        
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

        const signedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, signOptions);

        console.log(signedToken);
        
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