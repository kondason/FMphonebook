const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken = async (req, res, next) =>
{
    try
    {
        if (req.ignoreToken)
            return next();

        const token = req.header("authorization");

        const response =
        {
            "Data": ""
        };

        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!isVerified)
        {
            console.log(req);
            res.status(401).json({ Data: "Invalid token" });
        }
        next();
    } catch (error)
    {
        res.status(401).json({ Data: "Invalid token" });
    }
};


const IgnoreToken = async (req, res, next) =>
{
    try
    {
        const nonSecurePaths = [
            '/Authentication/AuthenticateUser',
            '/Users/CreateUser',
            '/Professions/GetProfessions',
            '/Clubs/GetClubs',
            '/Terms',
            '/Privacy',

        ];

        if (nonSecurePaths.includes(req.path))
            req.ignoreToken = true;

        next();
    } catch (error)
    {
        res.status(500).json(error);
    }
};


module.exports =
{
    VerifyToken,
    IgnoreToken
}