const { check, validationResult } = require('express-validator');
const usersBL = require('../../BL/usersBL');

const LoginValidatorResult = async (req, res, next) =>
{
    const result = validationResult(req);

    if (result.isEmpty())
        next();
    else
    {
        const oldInputs =
        {
            "Email": req.body.Email,
            "Password": req.body.Password
        };

        return res.status(422).render("login", { "Errors": result.errors, "OldInputs": oldInputs });
    }
};

const LocalEmailAndPasswordLogin = [
    check('Email').custom(async (value) =>
    {
        const result = await usersBL.IsEmailExists(value);

        if (result < 1)
            return Promise.reject();

    }).withMessage("Email or password is Incorrect"),
    check('Password').notEmpty().withMessage("You muse enter email & password in order to login"),
];

module.exports = { LocalEmailAndPasswordLogin, LoginValidatorResult };