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

        return response.data;
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

const GetUserByLoginTypeObjectID = async (loginTypeID,loginTypeObjectID) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUserByLoginTypeObjectID", { "LoginTypeID":loginTypeID,"LoginTypeObjectID": loginTypeObjectID });
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

const UpdateLoginTypeObjectID = async (loginTypeID, loginTypeObjectID, email) =>
{
    try 
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/UpdateLoginTypeObjectID", { "LoginTypeID": loginTypeID, "LoginTypeObjectID": loginTypeObjectID, "Email": email });
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

const GetUsersByParameters = async (name, email, professionID, clubID, teamAgeID, employmentStatusID) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Users/GetUsersByParameters", { Name: name, Email: email, ProfessionID: professionID, ClubID: clubID, TeamAgeID: teamAgeID, EmploymentStatusID: employmentStatusID });
        return response.data;
    } catch (error)
    {
        throw error.message;
    }
};

const UpdateUser = async (userDetails, requestedUserID) =>
{
    try
    {

        const response = await axios.put(process.env.BASE_REST_API_PATH + "Users/UpdateUser", { RequestedUserID: requestedUserID, UserDetails: userDetails });
        return response.data;
    } catch (error)
    {
        throw error.message;
    }
};

const AuthenticateUser = async (loginTypeID,email, passwordOrProfileID) =>
{
    try
    {
        const response = await axios.post(process.env.BASE_REST_API_PATH + "Authentication/AuthenticateUser", { LoginTypeID: loginTypeID,Email: email, Password: passwordOrProfileID });
        return response.data;
    } catch (error)
    {
        throw error.message;
    }
}

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
    GetPosts,
    GetPostTypes,
    AddPost,
    GetTeamAges,
    GetEmploymentStatuses,
    GetUsersByParameters,
    UpdateUser,
    AuthenticateUser
}