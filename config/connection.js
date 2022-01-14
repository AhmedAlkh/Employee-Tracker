const mysql = require('mysql2');

require('dotenv').config();

const db_connection = mysql.createConnection({
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW
}, 
 console.log('Successfully connected to database!')
);

module.exports = db_connection;