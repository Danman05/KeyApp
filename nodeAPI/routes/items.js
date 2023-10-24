const express = require('express');
const router = express.Router();
const items = require('../items');

/* GET users. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await items.getItems(req.query.page));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/* GET users. */
router.get('/categories', async function (req, res, next) {
    try {
        res.json(await items.getCategories(req.query.page));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});
module.exports = router;