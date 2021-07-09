const mysqlDAL = require('../DAL/MysqlDAL');

const GetPosts = async () =>
{
    try
    {
        const result = await mysqlDAL.GetPosts();

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        return error;
    }
};

const GetPostTypes = async () =>
{
    try
    {
        const result = await mysqlDAL.GetPostTypes();

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        return error;
    }
};

const AddPost = async(userID, postTypeID, body)=>{
    try
    {
        console.log(userID, postTypeID, body);
        const result = await mysqlDAL.AddPost(userID, postTypeID, body);

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": result
        };

        return response;
    } catch (error)
    {
        console.log(error);
        return error;
    }
};

module.exports =
{
    GetPosts,
    GetPostTypes,
    AddPost
}