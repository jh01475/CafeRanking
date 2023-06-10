const mysql = require('mysql');

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'test0602',
    charset:'utf8mb4',
    port: 3360
});

module.exports = db;