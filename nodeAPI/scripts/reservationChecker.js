/*
    Deletes reservation records from the database when todays date is greater
    Than the expiration date from the end date stored in the database
*/
const db = require('../db');
const mailChecker = require('nodemailer');


const availableId = 1;

const transporter = mailChecker.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});
try {
    console.log("running script");
    fetchData();
} catch (error) {
    console.log(`Error has occoured: ${error}`);
}

async function fetchData() {
    const data = await db.query(`
    SELECT vk.virtualKeyId, vk.reserveringId, vk.userId, 
    r.startDato, r.slutDato,
    e.enhedId, e.enhedTitel,
    bOwner.fornavn AS ownerName, bOwner.mail AS ownerMail,
    bLender.fornavn AS lenderName, bLender.mail AS lenderMail
    FROM virtualkey as vk
    JOIN reservering AS r ON vk.reserveringId = r.reserveringId
    JOIN enhed AS e ON e.enhedId = r.enhedId
    JOIN bruger AS bOwner ON bOwner.brugerId = e.enhedEjerId
    JOIN bruger as bLender ON bLender.brugerId = vk.userId 
`);

    const todayDate = new Date();

    var expiredItemList = [];
    var count = 0;

    data.forEach(item => {
        const sqlDate = new Date(item.slutDato);
        const timeDifference = sqlDate - todayDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 0) {
            expiredItemList[count] = item;
            count++;
            console.log(`expired item added to list - KeyId: ${item.virtualKeyId}, reservationId: ${item.reserveringId}, enhedId: ${item.enhedId}`);
        }
        else if (daysDifference == 0) {
            sendMail(item.lenderMail, item);
            console.log(`sent mail to: ${item.lenderMail}`);
        }
    });

    var virtualKeysId = [];
    var reservationId = [];
    var itemId = [];

    expiredItemList.forEach(item => {
        virtualKeysId.push(item.virtualKeyId);
        reservationId.push(item.reserveringId);
        itemId.push(item.enhedId);
    });

    // Join the IDs into comma-separated strings
    var virtualKeysIdString = virtualKeysId.join(', ');
    var reservationIdString = reservationId.join(', ');
    var itemIdString = itemId.join(', ');

    if (virtualKeysIdString && reservationIdString && itemIdString) {
        await db.query(`DELETE FROM virtualkey WHERE virtualKeyId IN (${virtualKeysIdString})`);
        await db.query(`DELETE FROM reservering WHERE reserveringId IN (${reservationIdString})`);
        await db.query(`UPDATE enhed as e SET e.reserveringStatusId = ${availableId} WHERE e.enhedId IN (${itemIdString})`);
    }
}
function sendMail(mail, item) {

    const mailOptions = {
        from: '',
        to: mail,
        subject: 'Din reservering udløber snart',
        text: `Hej ${item.lenderName},
        
        Din reservation for ${item.enhedTitel} udløber snart. Her er nogle detaljer:
        
        Periode: ${new Date(item.startDato).toLocaleDateString("da-DK")} - ${new Date(item.slutDato).toLocaleDateString("da-DK")}
        enhed ID: ${item.enhedId}`,

        html: `<p>Hej ${item.lenderName}, </p>
         
        <p>Din reservation for <strong>${item.enhedTitel}</strong> udløber snart. Her er nogle detaljer:</p>

        <p>Periode: ${new Date(item.startDato).toLocaleDateString("da-DK")} - ${new Date(item.slutDato).toLocaleDateString("da-DK")}<br/>
        enhed ID: ${item.enhedId} | Du kan se enheden <a href='http://localhost:4200/enhed/${item.enhedId}'>Her</a></p>
    `};

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(`Error sending mail ${error}`);
        }
        else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}