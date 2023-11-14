const express = require('express')
const router = express.Router();
const user = require('../user');


/* POST new user - create new user */
router.post('/new', async function (req, res, next) {
    try {
        const queryData = {
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            mail: req.query.mail,
            phone: req.query.phone,
            password: req.query.password
        };
        res.json(await user.createUser(queryData));
    } catch (err) {
        console.error(`Error while registering user `, err.message);
        next(err);
    }
});

/* GET Auth - Login */
router.get('/auth', async function (req, res, next) {
    try {
        const mail = req.query.mail;
        const password = req.query.password;
        res.json(await user.authUser(mail, password));
    } catch (err) {
        console.error(`Error while authenticating user `, err.message);
        next(err);
    }
});

module.exports = router;