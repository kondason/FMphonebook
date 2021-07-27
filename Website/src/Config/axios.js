const axios =  require ('axios');

const SetDefaultTokenForRequests = (token)=>
{
    axios.defaults.headers.common['Authorization'] = token;
}

module.exports = {SetDefaultTokenForRequests};