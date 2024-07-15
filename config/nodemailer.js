const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'thebridgeclase@gmail.com',
        pass: 'szexejkmpzavklkn'
    }
});
module.exports = transporter;