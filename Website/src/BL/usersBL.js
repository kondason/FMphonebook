const restApiDAL = require('../DAL/restAPIDal');

const GetUserByID = async (userID) =>
{
    try
    {
        const response = await restApiDAL.GetUserByID(userID);
        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetUserByLoginTypeObjectID = async (loginTypeObjectID) =>
{
    try
    {
        const response = await restApiDAL.GetUserByLoginTypeObjectID(loginTypeObjectID);
        return response;
    } catch (error)
    {
        throw error;
    }
};

const UpdateUserURLImage = async (imageURL, userID) =>
{
    try
    {
        const response = await restApiDAL.UpdateUserURLImage(imageURL, userID);
        return response;
    } catch (error)
    {
        throw error;
    }
};

module.exports =
{
    GetUserByID,
    GetUserByLoginTypeObjectID,
    UpdateUserURLImage
};