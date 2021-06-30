const mysqlDAL = require('../DAL/MysqlDAL');

const GetUsersByParameters = async (searchParams) =>
{
    try
    {
        const result = await mysqlDAL.GetUsersByParameters(searchParams);
        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetUserByID = async (userID) =>
{
    try
    {
        const result = await mysqlDAL.GetUserByID(userID);

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

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
        const result = await mysqlDAL.GetUserByLoginTypeObjectID(loginTypeObjectID);
        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        throw error;
    }
};

const CreateUser = async (userDetails) =>
{
    try
    {
        const result = await mysqlDAL.CreateUser(userDetails);   

        const response =
        {
            "Status": 201,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        throw error;
    }
};

const DeleteUser = async (requestedUserID, userID) =>
{
    try
    {
        const response =
        {
            "Status": 405,
            "Msg": "You are not allowed to perform this action.",
            "Data": ""
        };

        if ((requestedUserID == userID) || (await mysqlDAL.IsAdmin(requestedUserID) == true))
        {
            const result = await mysqlDAL.DeleteUser(userID);

            response.Status = 200;
            response.Data = result;
            response.Msg = "Deleted."

        }
        return response;

    } catch (error)
    {
        throw error;
    }
};

const UpdateUser = async (requestedUserID, userDetails) =>
{
    try
    {
        const response =
        {
            "Status": 405,
            "Msg": "You are not allowed to perform this action.",
            "Data": ""
        };

        if ((requestedUserID == userDetails.UserID) || (await mysqlDAL.IsAdmin(requestedUserID) == true))
        {
            const result = await mysqlDAL.UpdateUser(userDetails);

            response.Status = 200;
            response.Data = result;
            response.Msg = "Updated."

        }
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
        const result = await mysqlDAL.IsEmailExists(email);

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        throw error;
    }
}

const UpdateUserURLImage = async (userID, imageURL) =>
{
    try
    {
        const response =
        {
            "Status": 405,
            "Msg": "You are not allowed to perform this action.",
            "Data": ""
        };

        const result = await mysqlDAL.UpdateUserURLImage(userID, imageURL);

        response.Status = 200;
        response.Data = result;
        response.Msg = "Updated.";

        return response;

    } catch (error)
    {
        throw error;
    }
};

const UpdateLoginTypeObjectID = async (loginTypeID, loginTypeObjectID,userID) =>
{
    try
    {
        const response =
        {
            "Status": 500,
            "Msg": "You are not allowed to perform this action.",
            "Data": ""
        };

        const result = await mysqlDAL.UpdateLoginTypeObjectID(loginTypeID, loginTypeObjectID,userID);

        response.Status = 200;
        response.Data = result;
        response.Msg = "Updated.";

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
        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": ""
        };

        const result = await mysqlDAL.GetUserIDByEmail(email);

        response.Status = 200;
        response.Data = result;
        response.Msg = "";

        return response;

    } catch (error)
    {
        throw error;
    }
}

const GetUserIDAndPassByEmail = async (email)=>
{
    try
    {
        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": ""
        };

        const result = await mysqlDAL.GetUserIDAndPassByEmail(email);

        response.Status = 200;
        response.Data = result;
        response.Msg = "";

        return response;

    } catch (error)
    {
        throw error;
    }
}



module.exports =
{
    CreateUser,
    GetUsersByParameters,
    GetUserByID,
    GetUserByLoginTypeObjectID,
    DeleteUser,
    UpdateUser,
    IsEmailExists,
    UpdateUserURLImage,
    UpdateLoginTypeObjectID,
    GetUserIDByEmail,
    GetUserIDAndPassByEmail
};