const db = require('../nodeAPI/db');
const helper = require('../nodeAPI/helper');
const config = require('../nodeAPI/config');

async function getItems(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT enhedId, enhedTitel, enhedBeskrivelse, enhedBemærkning, enhedBillede, kategori.enhedsType, status.statusBesked, bruger.fornavn
    FROM enhed
    JOIN enhedkategori AS kategori ON enhedKategoriId = kategoriId
    JOIN reserveringstatus AS status ON reserveringStatusId = statusId
    JOIN bruger AS bruger ON enhedEjerId = brugerId
    LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    data.forEach(item => {
        console.log(item);
        if (item.enhedBemærkning)
            item.enhedBemærkning = JSON.parse(item.enhedBemærkning);
    });
    const meta = { page };

    return {
        data,
        meta
    }
}
async function getCategories(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT kategoriId, enhedsType
    FROM enhedkategori
    LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    data.forEach(item => {
        console.log(item);
    });
    const meta = { page };

    return {
        data,
        meta
    }
}
async function createItem(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT kategoriId, enhedsType
    FROM enhedkategori
    LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    data.forEach(item => {
        console.log(item);
    });
    const meta = { page };

    return {
        data,
        meta
    }
}

module.exports = {
    getItems,
    getCategories
}