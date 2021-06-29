const bcrypt = require('bcryptjs');
const saltRounds = 12;

const EncryptPassword = async (passwordToEncrypt) =>
{
    try
    {
        const encryptedPassword = await bcrypt.hash(passwordToEncrypt, saltRounds);
        return encryptedPassword;
    } catch (error)
    {
        throw error;
    }
}

const ComparePassword = async (Password1, Password2) =>
{
    try
    {
        const result = await bcrypt.compare(Password1, Password2)
        return result;
    } catch (error)
    {
        throw error;
    }
}

module.exports = 
{
    EncryptPassword,
    ComparePassword
};