const mysqlDAL = require('../DAL/MysqlDAL');

const GetEmploymentStatuses = async () =>
{
    try
    {
        const result = await mysqlDAL.GetEmploymentStatuses();

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
    GetEmploymentStatuses
}