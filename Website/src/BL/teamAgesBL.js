const restApiDAL = require('../DAL/restAPIDal');


const GetTeamAges = async () =>
{
    try
    {
        const response = await restApiDAL.GetTeamAges();
        return response;
    } catch (error)
    {
        throw error;
    }
};



module.exports =
{
    GetTeamAges
}