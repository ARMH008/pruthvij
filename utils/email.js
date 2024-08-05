const nodemailer = require("nodemailer");
const pug = require("pug");
// const htmlToText = require('html-to-text');
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    //the url is ooming from the authcontroller
    this.url = url;
    this.from = `PRUTHVIJ DESAI <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject, event, user) {
    console.log("First Name:", this.firstName); // Log the firstName
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      event,
      user,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendEventNotification(event) {
    await this.send(
      "event", // Template name
      "New Event Created", // Email subject
      event // Pass event data to the email template
    );
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the PM Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
