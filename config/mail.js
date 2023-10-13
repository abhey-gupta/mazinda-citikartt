const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "contact@citikartt.com",
        pass: "V0a3KRD4nrQSjWB1",
    },
});

// To send the email

export const sendEmail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: "contact@citikartt.com", // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
    console.log("Email sent: %s", info.messageId);
}