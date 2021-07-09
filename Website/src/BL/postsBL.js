const restApiDAL = require('../DAL/restAPIDal');


const GetPosts = async (postsCount) =>
{
    try
    {
        const response = await restApiDAL.GetPosts();
        response.Data = response.Data.slice(0, postsCount ? postsCount : response.Data.length);

        response.Data = response.Data.map(post =>
        {
            post.CreationDate = new Date(post.CreationDate).toLocaleDateString('en-gb');
            return post;
        });

        return response;
    } catch (error)
    {
        throw error;
    }
};

const GetPostTypes = async () =>
{
    try
    {
        const response = await restApiDAL.GetPostTypes();
        return response.Data;
    } catch (error)
    {
        throw error;
    }
};

const AddPost = async (userID, postTypeID, postBody) =>
{
    try
    {
        const response = await restApiDAL.AddPost(userID, postTypeID, postBody);
        return response.Data;
    } catch (error)
    {
        throw error;
    }
}

module.exports =
{
    GetPosts,
    GetPostTypes,
    AddPost
}