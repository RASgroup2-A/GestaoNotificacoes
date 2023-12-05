const nodemailer = require('nodemailer')
const html = '<html><h1>HELLO</h1></html>'
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');


async function send(email,password) {
  const mailOptions = {
    from: email,
    to: email,
    subject: 'Hello',
    html: html
  };
  console.log(email)
  console.log(password)
  try {

    var transport = nodemailer.createTransport(smtpTransport({
      host: "smtp.office365.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      auth: {
          user: email,
          pass: password,
          type: 'OAuth2',
          clientId: process.env.clientId,
          clientSecret: process.env.clientSecret,
          refreshToken: process.env.refreshToken,
          accessToken: process.env.accessToken,
          expires: 3600
      },
      tls: {
          ciphers:'SSLv3',
          rejectUnauthorized: false
      }
    }))
    const info = await transport.sendMail(mailOptions);


    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
