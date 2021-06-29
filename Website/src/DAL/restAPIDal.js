const { default: axios } = require('axios');

require('dotenv').config();

const GetProfessions = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "Professions/GetProfessions");
        return response.data;
    } catch (error)
    {
        throw error
    }
};

const GetClubs = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "Clubs/GetClubs");
        return response.data;
    } catch (error)
    {
        throw error
    }
};

const CreateUser = async (userObject) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/CreateUser", { "UserDetails": userObject });
        return response.data.Data;
    } catch (error)
    {
        throw error;
    }
};

const IsEmailExists = async (email) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/IsEmailExists", { "Email": email });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const CreateProfession = async (professionName) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Professions/CreateProfession", { "ProfessionName": professionName });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const CreateClub = async (clubName) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Clubs/CreateClub", { "ClubName": clubName });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const GetUserByID = async (userID) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUserByID", { "UserID": userID });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const GetUserByLoginTypeObjectID = async (loginTypeObjectID) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUserByLoginTypeObjectID", { "LoginTypeObjectID": loginTypeObjectID });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const UpdateUserURLImage = async (imageURL, userID) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/UpdateUserURLImage", { "UserID": userID, "ImageURL": imageURL });
        return response.data.Data;
    } catch (error)
    {
        console.log("error",error.message);
        throw error
    }
};

module.exports =
{
    GetProfessions,
    GetClubs,
    CreateUser,
    IsEmailExists,
    CreateClub,
    CreateProfession,
    GetUserByID,
    GetUserByLoginTypeObjectID,
    UpdateUserURLImage
}