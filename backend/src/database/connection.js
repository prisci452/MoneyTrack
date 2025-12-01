const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          
  password: 'Priscila.12',          
  database: 'moneytrack',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
