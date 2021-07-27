const restApiDAL = require('../DAL/restAPIDal');
var _ = require('lodash');

const GetUserByID = async (userID, requestedUserID) =>
{
    try
    {
        const response = await restApiDAL.GetUserByID(userID);

        response.Birthday = new Date(response.Birthday).toLocaleDateString("af-ZA");
        response.CreationDate = new Date(response.CreationDate).toLocaleDateString("af-ZA");
        response.FirstName = _.capitalize(response.FirstName);
        response.LastName = _.capitalize(response.LastName);

        if (requestedUserID != userID)
        {
            response.Email = response.PublicEmail ? response.Email : "";
            response.Mobile = response.PublicMobile ? response.Mobile : "";
        }
     
        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetUserByLoginTypeObjectID = async (loginTypeID,loginTypeObjectID) =>
{
    try
    {
        const response = await restApiDAL.GetUserByLoginTypeObjectID(loginTypeID,loginTypeObjectID);
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

const UpdateLoginTypeObjectID = async (loginTypeID, loginTypeObjectID, email) =>
{
    try
    {
        const response = await restApiDAL.UpdateLoginTypeObjectID(loginTypeID, loginTypeObjectID, email);   
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

const GetUsersByParameters = async (name, email, professionID, clubID, teamAgeID, employmentStatusID) =>
{
    try
    {
        const result = await restApiDAL.GetUsersByParameters(name, email, professionID, clubID, teamAgeID, employmentStatusID);
        return result;
    } catch (error)
    {
        throw error;
    }
};

const UpdateUser = async (userDetails,userID,requestedUserID) =>
{
    try
    {
        userDetails.UserID = userID;
        const result = await restApiDAL.UpdateUser(userDetails,requestedUserID);

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
    IsEmailExists,
    GetUsersByParameters,
    UpdateUser
};