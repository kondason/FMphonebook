const restApiDAL = require('../DAL/restAPIDal');
const passwordHelper = require('../Helpers/passwordHelper');


const CreateUser = async (loginTypeID,/* only for 3rd party users - Facebook or Gmail */loginTypeObjectID, email, password, firstName, lastName, birthday, professionID, professionOther, clubID, clubOther) =>
{
    try
    {
        
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

        const response = await restApiDAL.CreateUser(userObject);
        
        return response;
    } catch (error)
    {
        throw error;
    }
};


module.exports =
{
    CreateUser
}