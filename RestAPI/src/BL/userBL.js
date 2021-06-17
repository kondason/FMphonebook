const mysqlDAL = require('../DAL/MysqlDAL');

const GetUsers = async () =>
{
    try
    {
        const result = await mysqlDAL.GetUsers();
        return result;
    } catch (error)
    {
        console.log(error);
    }
};

const CreateUser = async () =>
{
    try
    {
        user.UserName = "sesaesa";
        const result = await user.save()

        console.log(result);
    } catch (error)
    {
        console.log(error);
    }
};

module.exports =
{
    GetUsers,
    CreateUser
};