const restApiDAL = require('../DAL/restAPIDal');



const AuthenticateUser = async (loginTypeID, email, passwordOrProfileID,) =>
{
    try
    {
        const response = await restApiDAL.AuthenticateUser(loginTypeID, email, passwordOrProfileID);
        return response;
    } catch (error)
    {
        throw error;
    }
};

module.exports = { AuthenticateUser }