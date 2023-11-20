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
    fetchData();
} catch (error) {
    console.log(`Error has occoured: ${error}`);
}

async function fetchData() {
    await db.query(`
    SELECT vk.virtualKeyId, vk.reserveringId, 
    r.startDato, r.slutDato,
    e.enhedId, e.enhedTitel,
    b.fornavn, b.mail
    FROM virtualkey as vk
    JOIN reservering AS r ON vk.reserveringId = r.reserveringId
    JOIN enhed AS e ON e.enhedId = r.enhedId
    JOIN bruger AS b ON b.brugerId = e.enhedEjerId 
`).then(res => {

        const todayDate = new Date();

        var expiredItemList = [];
        var count = 0;

        res.forEach(item => {

            const sqlDate = new Date(item.slutDato);
            const timeDifference = sqlDate - todayDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference < 0) {
                expiredItemList[count] = item;
                count++;
                console.log(`expired item added to list - KeyId: ${item.virtualKeyId}, reservationId: ${item.reserveringId}, enhedId: ${item.enhedId}`);
            }
            else if (daysDifference == 0) {
                sendMail(item);
                console.log(`sent mail to: ${item.mail}`);
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
            db.query(`DELETE FROM virtualkey WHERE virtualKeyId IN (${virtualKeysIdString})`);
            db.query(`DELETE FROM reservering WHERE reserveringId IN (${reservationIdString})`);
            db.query(`UPDATE enhed as e SET e.reserveringStatusId = ${availableId} WHERE e.enhedId IN (${itemIdString})`);
        }
    });
}

function sendMail(item) {

    const mailOptions = {
        from: '',
        to: item.mail,
        subject: 'Din reservering udløber snart',
        html: `<p>Hej ${item.fornavn}, </p>
         
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