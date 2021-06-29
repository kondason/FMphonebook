const mysqlDAL = require('../DAL/MysqlDAL');

const GetClubs = async () =>
{
    try
    {
        const result = await mysqlDAL.GetClubs();

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

const CreateClub = async (clubName) =>
{
    try
    {
        const result = await mysqlDAL.CreateClub(clubName);

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
    GetClubs,
    CreateClub
}