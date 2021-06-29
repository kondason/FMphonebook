const axios = require('axios');
const fs = require('fs');
const Path = require('path')

require('dotenv').config();


const GetImageFromURL = async (imageUrl) =>
{
    try
    {

        const streamImage = await axios.get(imageUrl, { responseType: 'stream' });

        return streamImage.data;
    } catch (error)
    {
        console.log(error);
    }
};

const SaveUserImageFromStreamReturnURL = async (streamImage, userID) =>
{
    try
    {
        const path = Path.resolve(__dirname, `../public/images/Users/${userID}.jpg`)

        streamImage.pipe(fs.createWriteStream(path));

        return path;
    } catch (error)
    {
        console.log(error);
    }
};

module.exports = {
    GetImageFromURL,
    SaveUserImageFromStreamReturnURL
};