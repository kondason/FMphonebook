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

module.exports =
{
    GetPosts
}