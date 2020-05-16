import nodemailer from 'nodemailer'
import events from 'events'
import { compileTemplate } from './compileTemplates'
export const sendMailEvent = new events.EventEmitter()
export const createProfileEvent = new events.EventEmitter()

/**
 * a function that sends
 * an email activation link for users
 */
const template:any = compileTemplate()
const sendMail = async (mailInfo:any) => {
  // creating an email transport layer
  const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },

  })
  const message = {
    to: mailInfo.email,
    subject:mailInfo.subject,
    text:'Hello please follow the link below to reset your password',
    html: template.render({ mailInfo }) ,
  }
  try {
    await transport.sendMail(message)
  }catch (error) {
    console.log(error)
  }
}

// emmitting the send mails events

sendMailEvent.on('sendMail', sendMail)
