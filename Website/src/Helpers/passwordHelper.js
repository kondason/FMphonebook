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

const ComparePassword = async (password1, hashPassword) =>
{
    try
    {
        const result = await bcrypt.compare(password1, hashPassword)
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