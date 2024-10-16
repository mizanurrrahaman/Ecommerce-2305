import nodemailer from 'nodemailer'
  import { host, userEmail, userEmailPassword } from '../config/index.js'
  
  const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false, // true for port 465, false for other ports
    // auth: {
    //   user:  'm89260268@gmail.com',
    //   pass:  'eblk qouc ywhp ycip',
    // },
    auth: {
      user: userEmail,
      pass: userEmailPassword
    },
  })
  
  const sendEmail = async (options) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Tech Nest" <noreply@technest.com>', // sender address
      to: options.email, // list of receivers
      subject: 'Reset Passwrod for Tech Nest Account', // Subject line
      text: '', // plain text body
      html: options.html, // html body
    })
  }
  
  export default sendEmail














{/*

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
  
  const sendEmail = async (options) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Tech Nest" <noreply@technest.com>', // sender address
      to: options.email, // list of receivers
      subject: 'Reset Passwrod for Tech Nest Account', // Subject line
      text: '', // plain text body
      html: options.html, // html body
    })
  }
  
  export default sendEmail
*/}



//eblk qouc ywhp ycip
//eblk qouc ywhp ycip


{/*

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "citmern2305@gmail.com",
    pass: " afli svdq xngm reju",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function mail(to, subject, text = "", html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"mern 2305" <maddison53@ethereal.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

*/}