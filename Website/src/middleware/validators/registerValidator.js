const { check, validationResult } = require('express-validator');
const usersBL = require('../../BL/usersBL');
const registerBL = require('../../BL/registerBL');

const RegisterValidatorResult = async (req, res, next) =>
{
    const result = validationResult(req);

    if (result.isEmpty())
        next();
    else
    {
        const professions = await registerBL.GetProfessions();
        const clubs = await registerBL.GetClubs();

        const oldInputs =
        {
            "Email": req.body.Email,
            "Password": req.body.Password,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "ClubID": req.body.ClubID,
            "ProfessionID": req.body.ProfessionID,
            "ProfessionOther": req.body.ProfessionOther,
            "ClubOther": req.body.ClubOther,
            "PoliceAndTerms" : req.body.PoliceAndTerms
        };

        return res.status(422).render("register", { "Professions": professions.Data, "Clubs": clubs.Data, "Errors": result.errors, "OldInputs": oldInputs });
    }
};


const UserPasswordRegValidatorMiddleware = [
    check('Email').trim().isEmail().withMessage('You must enter a valid email.'),
    check('Email').custom(async (value) =>
    {
        const result = await usersBL.IsEmailExists(value);
        
        if (result)
            return Promise.reject();

    }).withMessage("Email already exist. please try to sign in."),
    check('Password').trim().isLength({ min: 6 }).withMessage('Password much be 6 characters long.'),
    check('FirstName').trim().not().isEmpty().withMessage('First name is required'),
    check('LastName').trim().not().isEmpty().withMessage('First name is required'),
    check('ClubID').custom((value, { req }) =>
    {
        if (value == 0)
            throw new Error('You must select club from the list or select other and type new club.');

        if (value == 6 && req.body.ClubOther == "")
            throw new Error('You must select club from the list or select other and type new club.');

        return true;
    }),
    check('ProfessionID').custom((value, { req }) =>
    {
        if (value == 0)
            throw new Error('You must select profession from the list or select other and type new profession.');

        if (value == 10 && req.body.ProfessionOther == "")
            throw new Error('You must select profession from the list or select other and type new profession.');

        return true;
    }),
    check('PoliceAndTerms').not().isEmpty().withMessage("You must accept the terms & policy.")
];

module.exports = { UserPasswordRegValidatorMiddleware,RegisterValidatorResult };