const mysqlDAL = require('../DAL/MysqlDAL');
const passwordHelper = require('../helpers/passwordHelper');
const jwtHelper = require('../helpers/jwtHelper');

const AuthenticateUser = async (loginTypeID, email, passwordOrprofileID) =>
{
    try
    {
        let userID = '';
        let token = '';
        let isValid = false;

        switch (loginTypeID)
        {
            case 1:
                const userData = await mysqlDAL.GetUserIDAndPassByEmail(email);
                userID = userData.UserID;
                isValid = await passwordHelper.ComparePassword(passwordOrprofileID, userData.Password);
                break;
            case 2:
            case 3:
                const result = await mysqlDAL.GetUserIDBySocialDetails(loginTypeID, email, passwordOrprofileID);

                if (result)
                {
                    isValid = true;
                    userID = result.UserID;
                }
                break;
            default:

                break;
        }

        if (isValid)
            token = jwtHelper.CreateJTWToken(userID);
        else
            userID = '';

        const response =
        {
            "Status": 200,
            "Msg": "",
            "Data": {
                status: isValid,
                token: token,
                userID: userID
            }
        };
        return response;
    } catch (error)
    {
        throw error;
    }
}


module.exports = {
    AuthenticateUser
}