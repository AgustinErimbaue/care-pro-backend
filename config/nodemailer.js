const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nodemailer1993@gmail.com',
        pass: 'ycrv h xzq yu a x mrzy'
    }
});
module.exports = transporter;