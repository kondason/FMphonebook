const restApiDAL = require('../DAL/restAPIDal');
const passwordHelper = require('../Helpers/passwordHelper');

const GetProfessions = async () =>
{
    try
    {
        const response = await restApiDAL.GetProfessions();
        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetClubs = async () =>
{
    try
    {
        const response = await restApiDAL.GetClubs();
        return response;
    } catch (error)
    {
        throw error;
    }
};

const CreateUser = async (loginTypeID,/* only for 3rd party users - Facebook or Gmail */loginTypeObjectID, email, password, firstName, lastName, birthday, professionID, professionOther, clubID, clubOther) =>
{
    try
    {
        const response =
        {
            "Status": 500,
            "Msg": "",
            "Data": ""
        };

        const IsEmailExists = await restApiDAL.IsEmailExists(email);

        if (IsEmailExists)
        {
            response.Msg = "Email already exist. please try to sign in.";
            return response;
        }

        if (clubID == 6)
        {
            
            clubID = await restApiDAL.CreateClub(clubOther);
        }

        if (professionID == 10)
        {
            professionID = await restApiDAL.CreateProfession(professionOther);
        }

        if (loginTypeID == 1)
            password = await passwordHelper.EncryptPassword(password);

        const userObject =
        {
            "LoginTypeID": loginTypeID == null ? 1 : loginTypeID,
            "LoginTypeObjectID": loginTypeObjectID,
            "Email": email,
            "Password": password,
            "FirstName": firstName,
            "LastName": lastName,
            "Birthday": birthday,
            "ProfessionID": professionID,
            "ClubID": clubID,
        };

        response.Data = await restApiDAL.CreateUser(userObject);
        response.Status = 201;

        return response;
    } catch (error)
    {
        throw error;
    }
};





module.exports =
{
    GetProfessions,
    GetClubs,
    CreateUser
}