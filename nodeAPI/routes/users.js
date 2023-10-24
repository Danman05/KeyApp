const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET users. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await users.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting items `, err.message);
        next(err);
    }
});

module.exports = router;