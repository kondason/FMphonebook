
//Jwt Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jtwStrategyOptions =
{
    jwtFromRequest : ExtractJwt.fromBodyField('token'),
    secretOrKey: process.env.JWT_SECRET_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
};

passport.use(new JwtStrategy(jtwStrategyOptions, async function (payload, done)
{
    try
    {
        const user = await usersBL.GetUserByID(payload.sub);

        if (user)
            done(null, user);
        else
            done(null, false);
    } catch (error)
    {
        return done(error);
    }
}));