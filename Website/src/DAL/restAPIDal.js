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
        throw error
    }
};

const UpdateLoginTypeObjectID = async (loginTypeID, loginTypeObjectID, userID) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/UpdateLoginTypeObjectID", { "LoginTypeID": loginTypeID, "LoginTypeObjectID": loginTypeObjectID, "UserID": userID });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const GetUserIDByEmail = async (email) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUserIDByEmail", { "Email": email });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
}

const GetUserIDAndPassByEmail = async (email) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUserIDAndPassByEmail", { "Email": email });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }
};

const GetPosts = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "Posts/GetPosts");
        return response.data;
    } catch (error)
    {
        throw error
    }
};

const GetPostTypes = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "Posts/GetPostTypes");
        return response.data;
    } catch (error)
    {
        throw error
    }
};

const AddPost = async (userID, postTypeID, postBody) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Posts/AddPost", { UserID: userID, PostTypeID: postTypeID, Body: postBody });
        return response.data.Data;
    } catch (error)
    {
        throw error
    }

};


const GetEmploymentStatuses = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "EmploymentStatuses/GetEmploymentStatuses");
        return response.data;
    } catch (error)
    {
        throw error
    }
};

const GetTeamAges = async () =>
{
    try
    {
        const response = await axios.get(process.env.BASE_REST_API_PATH + "TeamAges/GetTeamAges");
        return response.data;
    } catch (error)
    {
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
    UpdateUserURLImage,
    UpdateLoginTypeObjectID,
    GetUserIDByEmail,
    GetUserIDAndPassByEmail,
    GetPosts,
    GetPostTypes,
    AddPost,
    GetTeamAges,
    GetEmploymentStatuses
}