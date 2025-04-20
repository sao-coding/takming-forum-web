import nodemailer from "nodemailer"

const resend = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL_SMTP_USERNAME,
    pass: process.env.GOOGLE_EMAIL_SMTP_PASSWORD
  }
})

export default resend
