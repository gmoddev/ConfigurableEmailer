const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const fs = require('fs')
require('dotenv').config()

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let emailConfig = {
    senderEmail: process.env.senderEmail,
    senderPassword: process.env.senderPassword,
    recipientEmail: '', 
    subject: '',
    body: '',
    scheduleTime: '0 8 * * *'
};


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailConfig.senderEmail,
        pass: emailConfig.senderPassword
    }
});

function sendEmail() {
    const recipients = emailConfig.recipientEmail.split(',').map(email => email.trim());

    const mailOptions = {
        from: emailConfig.senderEmail,
        to: recipients,  // Multiple recipients
        subject: emailConfig.subject,
        text: emailConfig.body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Schedule the email
function scheduleEmail() {
    schedule.scheduleJob(emailConfig.scheduleTime, sendEmail);
}

// Serve the form page
app.get('/', (req, res) => {
    res.render('index', { emailConfig });
});

// Schedule Route
app.post('/schedule', (req, res) => {
    const { senderEmail, senderPassword, recipientEmail, subject, body, time } = req.body;

    emailConfig.senderEmail = senderEmail;
    emailConfig.senderPassword = senderPassword;
    emailConfig.recipientEmail = recipientEmail;
    emailConfig.subject = subject;
    emailConfig.body = body;
    emailConfig.scheduleTime = time;

    // Reschedule the email job with the updated configuration
    scheduleEmail();

    res.render('index', { emailConfig, message: 'Email schedule updated successfully!' });
});


// Send Now route
app.post('/sendnow', (req, res) => {
    sendEmail();
    res.render('index', { emailConfig, message: 'Email sent immediately!' });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    scheduleEmail();
});
