const db = require('../nodeAPI/db');
const helper = require('../nodeAPI/helper');
const config = require('../nodeAPI/config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * 
    FROM bruger LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

module.exports = {
    getMultiple
}