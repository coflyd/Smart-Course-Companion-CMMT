const mysql = require('mysql2'); 
require('dotenv').config();  //actives dotenv : access var .env and allow process

const pool = mysql.createPool({ //groupe de connexions base de données
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT 
});

module.exports = pool.promise(); 
//exportes pool to use it and promise allow async/await than callbacks