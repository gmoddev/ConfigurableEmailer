const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Path to the configuration file
const configFilePath = 'emailConfig.json';

// Default email configuration
let emailConfig = {
    senderEmail: process.env.senderEmail,
    senderPassword: process.env.senderPassword,
    recipientEmail: '',
    subject: '',
    body: '',
    scheduleTime: '0 8 * * *'
};

// Load the configuration if it exists
if (fs.existsSync(configFilePath)) {
    try {
        const fileContent = fs.readFileSync(configFilePath, 'utf8');
        if (fileContent) { // Check if file is not empty
            const savedConfig = JSON.parse(fileContent);
            emailConfig = { 
                ...emailConfig, 
                ...savedConfig,
                senderEmail: process.env.senderEmail,
                senderPassword: process.env.senderPassword
            };
        }
    } catch (error) {
        console.error('Error parsing JSON configuration file:', error);
    }
}

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
        to: recipients,
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
    res.render('index', { 
        emailConfig: {
            ...emailConfig,
            senderPassword: '' 
        } 
    });
});

// Schedule Route
app.post('/schedule', (req, res) => {
    const { senderEmail, senderPassword, recipientEmail, subject, body, time } = req.body;

    emailConfig.senderEmail = senderEmail || emailConfig.senderEmail;
    emailConfig.senderPassword = senderPassword || emailConfig.senderPassword;
    emailConfig.recipientEmail = recipientEmail;
    emailConfig.subject = subject;
    emailConfig.body = body;
    emailConfig.scheduleTime = time;

    const configToSave = {
        recipientEmail: emailConfig.recipientEmail,
        subject: emailConfig.subject,
        body: emailConfig.body,
        scheduleTime: emailConfig.scheduleTime
    };
    fs.writeFileSync(configFilePath, JSON.stringify(configToSave, null, 2));

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailConfig.senderEmail,
            pass: emailConfig.senderPassword
        }
    });

    scheduleEmail();

    res.render('index', { 
        emailConfig: {
            ...emailConfig,
            senderPassword: '' 
        },
        message: 'Email schedule updated successfully!'
    });
});

// Update email and password securely
app.post('/update-credentials', (req, res) => {
    const { senderEmail, senderPassword } = req.body;

    if (senderEmail) emailConfig.senderEmail = senderEmail;
    if (senderPassword) emailConfig.senderPassword = senderPassword;

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailConfig.senderEmail,
            pass: emailConfig.senderPassword
        }
    });

    res.send('Credentials updated successfully!');
});

// Send Now route
app.post('/sendnow', (req, res) => {
    sendEmail();
    res.render('index', { 
        emailConfig: {
            ...emailConfig,
            senderPassword: '' 
        },
        message: 'Email sent immediately!'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    scheduleEmail();
});
