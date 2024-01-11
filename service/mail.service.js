const nodemailer = require('nodemailer');   // External module used to send mail.
const ejs = require('ejs');
const fs = require('fs');                   // In-built module used to interact with the local files.
const path = require('path');

const transporter = nodemailer.createTransport({    // Transporter - where we mention the service type & 
    service: 'gmail',                               // authentication of a sender's id.
    auth: {
        user: 'prakashbalamurugantrs@gmail.com',
        pass: 'ojesmvvpyfilesoa',
    },
});

function sendTicket(mailData) {     // Using this function to send the E-Ticket via mail.
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
