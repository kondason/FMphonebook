const mysqlDAL = require('../DAL/MysqlDAL');

const GetProfessions = async () =>
{
    try
    {
        const result = await mysqlDAL.GetProfessions();

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

const CreateProfession = async (professionName) =>
{
    try
    {
        const result = await mysqlDAL.CreateProfession(professionName);

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

module.exports = {
    GetProfessions,
    CreateProfession
}