const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    connectionLimit: 50,
    multipleStatements: true
}).promise();

module.exports =
{
    connection
};