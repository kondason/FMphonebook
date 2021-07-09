const restApiDAL = require('../DAL/restAPIDal');


const GetProfessions = async () =>
{
    try
    {
        const response = await restApiDAL.GetProfessions();
        return response;
    } catch (error)
    {
        throw error;
    }
};



module.exports =
{
    GetProfessions
}