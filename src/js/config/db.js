// MySQL Connection Pool Configuration for Node.js Backend
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'smarttka_user',
    password: process.env.DB_PASS || 'smart-tka123',
    database: process.env.DB_NAME || 'smarttka_db',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
