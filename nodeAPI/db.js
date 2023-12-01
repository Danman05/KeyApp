const mysql = require('mysql2/promise');
const config = require('../nodeAPI/config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    try {
        connection.beginTransaction();
        const [results,] = await connection.execute(sql, params);
        await connection.commit();
        return results;
    }
    catch (error){
        await connection.rollback()
        console.log(error);
    }
    finally {
        // Ensure the connection is always closed, even if an error occurs
        await connection.end();
    }
}

module.exports = {
    query
}