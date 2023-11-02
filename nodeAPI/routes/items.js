const express = require('express');
const router = express.Router();
const items = require('../items');

/* GET items. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await items.getItems(req.query.page));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/* GET categories. */
router.get('/categories', async function (req, res, next) {
    try {
        res.json(await items.getCategories(req.query.page));
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err);
    }
});
/* GET one item. */
router.get('/:itemId', async function (req, res, next) {
    try {
        const itemId = req.params.itemId;
        res.json(await items.getOneItem(req.query.page, itemId));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/* POST item. */
router.post('/create', async function (req, res, next) {
    try {
        res.json(await items.createItem(req.body));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});
module.exports = router;