const mysqlDAL = require('../DAL/MysqlDAL');

const GetTeamAges = async () =>
{
    try
    {
        const result = await mysqlDAL.GetTeamAges();

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

module.exports = {
    GetTeamAges
}