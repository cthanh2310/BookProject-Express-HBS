const nodeMailer = require('nodemailer');
const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAIL_PASSWORD;
const mailHost = process.env.MAILHOST;
const mailPort = process.env.MAILPORT;
const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword,
        }
    })
    const options = {
        from: adminEmail,
        to: to, // send to user email 
        subject: subject,   // title of email
        html: htmlContent,  // content HTML send to user email
    }
    return transporter.sendMail(options);

}
module.exports = {sendMail};