const db = require('../nodeAPI/db');
const helper = require('../nodeAPI/helper');
const config = require('../nodeAPI/config');


async function getItems(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`
    CALL getItemPreview(${offset}, ${config.listPerPage})
    `);
    const data = helper.emptyOrRows(rows[0]);
    console.log(data);
    const meta = { page };

    return {
        data,
        meta
    }
}
async function getOneItem(page = 1, itemId) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`
    CALL getOne(${offset}, ${config.listPerPage}, ${itemId})
    `);
    const data = helper.emptyOrRows(rows[0]);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getCategories(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`
    SELECT kategoriId, enhedsType
    FROM enhedkategori
    LIMIT ${offset},${config.listPerPage}
    `);
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function createItem(item) {

    const [users] = await db.query(`
    SELECT brugerId 
    FROM bruger 
    WHERE brugerId = ${item.enhedEjerId}
    `);

    if (!users)
        return 'No user found';

    await db.query(`
    INSERT INTO enhed(enhedTitel, enhedBeskrivelse, enhedBemærkning, enhedBillede, enhedKategoriId, enhedEjerId, reserveringStatusId)
    VALUES('${item.enhedTitel}', '${item.enhedBeskrivelse}', '${item.enhedBemærkning}', '${item.enhedBillede}', 
    ${item.enhedKategoriId}, ${item.enhedEjerId}, ${item.reserveringStatusId})
    `);
    return `User added succesfully`
}

module.exports = {
    getItems,
    getOneItem,
    getCategories,
    createItem
}