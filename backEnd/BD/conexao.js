const mysql = require('mysql2/promise');


const connection = mysql.createPool({
host:'localhost', 
user: 'root',
password: "ifrn.cn", 
database: 'lactoif'})




module.exports = connection