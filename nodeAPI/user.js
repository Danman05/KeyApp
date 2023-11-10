const db = require('./db');
const helper = require('./helper');
const hasher = require('./hasher');

async function createUser(queryData) {

    // Checking if mail is already in use
    const userMail = await db.query(`
    call getUserMail('${queryData.mail}');
    `);
    const mailData = helper.emptyOrRows(userMail[0]);

    if (mailData[0]) 
        return [{message: "mail is already is use"}];

    // create user, hash password & store in DB
    else {
        const hashedPassword = await hasher.genHash(queryData.password)
        await db.query(`
        CALL createUser('${queryData.firstName}', '${queryData.lastName}', '${queryData.mail}', '${queryData.phone}', '${hashedPassword}')
        `);
        return [{ message: "user registered succesfully"}];
    }
}
async function authUser(userMail, plainTextPassword) {

    const rows = await db.query(`    
        CALL getUserHashByMail('${userMail}')
        `);

    const data = helper.emptyOrRows(rows[0]);

    const identity = {
        password: data[0].identitetKodeord,
    }
    const user = {
        brugerId: data[0].brugerId,
        fornavn: data[0].fornavn,
        efternavn: data[0].efternavn,
        mail: data[0].mail,
        telefonnummer: data[0].telefonnummer,
    }
    if (await hasher.compareHash(plainTextPassword, identity.password))
        return user
    else
        return []
}

module.exports = {
    createUser,
    authUser,
}