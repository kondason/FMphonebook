const restApiDAL = require('../DAL/restAPIDal');


const GetClubs = async () =>
{
    try
    {
        const response = await restApiDAL.GetClubs();
        return response;
    } catch (error)
    {
        throw error;
    }
};



module.exports =
{
    GetClubs
}