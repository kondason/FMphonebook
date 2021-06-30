var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

require('dotenv').config();

var options = {
    host: process.env.DATABASE_HOST,
    port: 3306,
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    expiration: 86400000
};

var sessionStore = new MySQLStore(options);

module.exports =
{
    sessionStore
};