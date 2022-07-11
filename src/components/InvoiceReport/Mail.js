var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '2019med1003@iitrpr.ac.in',
        pass: 'Anuradha@99'
    }
});

var mailOptions = {
    from: 'angajalasaisri2000@gmail.com',
    to: 'angajalaanuradha@gmail.com',
    subject: 'CodeUnity Technologies',
    text: `something`
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});  
