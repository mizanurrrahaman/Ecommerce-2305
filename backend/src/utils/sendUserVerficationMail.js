import nodemailer from 'nodemailer'
import { host, userEmail, userEmailPassword } from '../config/index.js'

const transporter = nodemailer.createTransport({
  host: host,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'm89260268@gmail.com',
    pass: 'eblk qouc ywhp ycip',
  },
})

// async..await is not allowed in global scope, must use a wrapper
async function sendVerificationEmail(receiver, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Tech Nest" <noreply@technest.com>', // sender address
    to: receiver, // list of receivers
    subject: 'verify your email for Tech Nest account', // Subject line
    text: '', // plain text body
    html: html, // html body
  })
}

export default sendVerificationEmail