const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prakashbalamurugantrs@gmail.com',
        pass: 'ojesmvvpyfilesoa',
    },
});

function sendTicket(mailData) {
    return new Promise((resolve, reject) => {
        console.log("SENDING E-TICKET...");

        const ejsTemplatePath = path.join(__dirname, '..', 'views', 'eTicket.ejs');

        fs.readFile(ejsTemplatePath, 'utf-8', (err, ejsTemplate) => {
            if (err) {
                console.error('Error reading EJS template:', err);
                reject(err);
                return;
            }

            const htmlContent = ejs.render(ejsTemplate, { mailData });

            const mailOptions = {
                from: 'prakashbalamurugantrs@gmail.com',
                to: mailData.email,
                subject: 'E-Ticket For Transportation',
                html: htmlContent,
                contentType: 'text/html'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent:', info.response);
                    resolve(info);
                }
            });
        });
    });
}

module.exports = { sendTicket };
