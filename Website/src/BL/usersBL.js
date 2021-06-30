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

const UpdateLoginTypeObjectID = async (loginTypeID,loginTypeObjectID,userID)=>
{
    try
    {
        const response = await restApiDAL.UpdateLoginTypeObjectID(loginTypeID,loginTypeObjectID,userID);
        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetUserIDByEmail = async (email)=>
{
    try
    {
        const response = await restApiDAL.GetUserIDByEmail(email);
        return response;
    } catch (error)
    {
        throw error;
    }
};

const IsEmailExists = async (email) => 
{
    try
    {
        const result = await restApiDAL.IsEmailExists(email);
        return result;
    } catch (error)
    {
        throw error;
    }
};

const GetUserIDAndPassByEmail = async (email) =>
{
    try
    {
        const result = await restApiDAL.GetUserIDAndPassByEmail(email);
        return result;
    } catch (error)
    {
        throw error;
    }
};

module.exports =
{
    GetUserByID,
    GetUserByLoginTypeObjectID,
    UpdateUserURLImage,
    UpdateLoginTypeObjectID,
    GetUserIDByEmail,
    IsEmailExists,
    GetUserIDAndPassByEmail
};