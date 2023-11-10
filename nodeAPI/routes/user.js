const express = require('express')
const router = express.Router();
const user = require('../user');


router.post('/new', async function(req, res, next) {

    const queryData = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        mail: req.query.mail,
        phone: req.query.phone,
        password: req.query.password
    };
    try {
        res.json(await user.createUser(queryData));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});
router.get('/auth', async function(req, res, next) {
    try {
        const mail = req.query.mail;
        const password = req.query.password;
        res.json(await user.authUser(mail, password));
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

module.exports = router;