const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "day123",
    database: 'lactoif',
})




module.exports = connection