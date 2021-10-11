const express = require('express')
const api = express.Router()
const nodemailer = require('nodemailer')
const myEmail = 'skriv din email her'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'noex.nodemailer@gmail.com',
        pass: 'eaaamailer'
    },
    tls: {
        rejectUnauthorized: false
    }
})

api.post('/api/mail', (req, res) => {
    transporter.sendMail({
        from: req.body.email,
        to: myEmail,
        subject: 'Portfolio mail from: ' + req.body.email,
        text: req.body.text
    }, (err, info) => {
        if (err){
            console.log(err)
            res.json({succes: false})
        } else {
            console.log(info)
            res.json({succes: true})
        }
    })
})


module.exports = api