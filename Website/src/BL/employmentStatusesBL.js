const restApiDAL = require('../DAL/restAPIDal');


const GetEmploymentStatuses = async () =>
{
    try
    {
        const response = await restApiDAL.GetEmploymentStatuses();
        return response;
    } catch (error)
    {
        throw error;
    }
};



module.exports =
{
    GetEmploymentStatuses
}