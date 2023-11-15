const mysql = require('mysql2/promise');
const config = require('../nodeAPI/config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    try {
        const [results,] = await connection.execute(sql, params);
        return results;
    } finally {
        // Ensure the connection is always closed, even if an error occurs
        await connection.end();
    }
}

module.exports = {
    query
}