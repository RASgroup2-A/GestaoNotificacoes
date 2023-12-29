const nodemailer = require('nodemailer')

module.exports.send = async function (sender,receiver,subject,body) {
    let newreceiver = "receiver@uminho.pt"
    let password="xxxxxxxx"
    const html = "<body><h2>"+subject+"</h2><p>"+body+"</p></body>"
    const mailOptions = {
    from: sender,
    to: "probum2024@outlook.pt",
    subject: subject,
    html: html,
  };

  try {
    var transport = nodemailer.createTransport({
      host: 'pod51014.outlook.com', // server outlook
      port: 587,     // SMTP port
      secure: false, // false for TLS
      tls: {
        rejectUnauthorized: false
      },
      auth:  {
        user: newreceiver,
        pass: password
      }
    });
    transport.sendMail(mailOptions);
  } catch (error) {
    console.log('Error occurred:', error);
    throw error
  }
}