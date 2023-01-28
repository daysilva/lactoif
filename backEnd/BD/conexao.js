const mysql = require('mysql2/promise');


const connection = mysql.createPool({
host:'localhost', 
user: 'root',
password: "A1S2D3F4", 
database: 'lactoif'})




module.exports = connection