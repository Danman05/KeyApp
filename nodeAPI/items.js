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

async function getUserItems(userId) {
    const rows = await db.query(`
    CALL getUsersItems(${userId})
    `);
    const data = helper.emptyOrRows(rows[0]);
    return data;
}

async function getUserKeys(userId) {
    const rows = await db.query(`
    CALL getReservationKeys(${userId})
    `);
    const data = helper.emptyOrRows(rows[0]);
    return data;
}

async function getOneItemFull(itemId) {
    const rows = await db.query(`
    CALL getItemFullId(${itemId})
    `);
    const data = helper.emptyOrRows(rows[0]);
    const user = {
        brugerId: data[0].brugerId,
        fornavn: data[0].fornavn,
        efternavn: data[0].efternavn,
        mail: data[0].mail,
        telefonnummer: data[0].telefonnummer
    }
    const item = {
        enhedId: data[0].enhedId,
        enhedTitel: data[0].enhedTitel,
        enhedBeskrivelse: data[0].enhedBeskrivelse,
        enhedBemærkning: data[0].enhedBemærkning,
        enhedBillede: data[0].enhedBillede,
        enhedsType: data[0].enhedsType,
        statusBesked: data[0].statusBesked
    }
    return {
        user,
        item
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
    getUserItems,
    getUserKeys,
    getOneItemFull,
    getCategories,
    createItem
}