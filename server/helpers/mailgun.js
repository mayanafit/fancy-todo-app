const mailgun = require("mailgun-js");
var api_key = '74fbde57ceba8dc652b399e8eb82bca4-87c34c41-8a1463f3';
const DOMAIN = 'sandbox60a6224a9d8e447eadc40ce444bc24c3.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});


async function sendEmail(receiver,subject,text) {
    const data = {
        from: 'Todo-Fancy Team <mayanafitri25@gmail.com>',
        to: `${receiver}`,
        subject: subject,
        text: text
    };
        await mg.messages().send(data, function (error, body) {
            if (error) {
                throw error
            } else {
                console.log(body)
            }
        });
}

module.exports = sendEmail
