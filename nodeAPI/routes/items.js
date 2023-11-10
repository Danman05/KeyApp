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
/* GET owned items */
router.get('/userItem', async function(req, res, next) {
    try {
        res.json(await items.getUserItems(req.query.userId));
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err); 
    }
});

/* GET owner keys */
router.get('/userKey', async function (req, res, next) {
    try {
        res.json(await items.getUserKeys(req.query.userId));
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err);
    }
});

/* GET one item. */
router.get('/:itemId', async function (req, res, next) {
    try {
        const itemId = req.params.itemId;
        const data = await items.getOneItemFull(itemId)
        console.log(data);
        res.json(await items.getOneItemFull(itemId));
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