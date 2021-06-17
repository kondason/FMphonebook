const mysql = require("../Config/mysql").connection;

const GetUsers = async () =>
{
    try
    {
        const [rows, fields] = await mysql.query("select * from Users");
        return rows;
    } catch (error)
    {
        return error;
    }
};

module.exports =
{
    GetUsers
}