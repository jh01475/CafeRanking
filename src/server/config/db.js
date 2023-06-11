const mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '0147',
    database : 'mytest',
    charset:'utf8mb4',
    port: 3306
});

module.exports = db;