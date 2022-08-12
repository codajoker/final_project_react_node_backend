const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "olala-olala@meta.ua",
    pass: META_PASS,
  },
};

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  const email = { ...data, from: "olala-olala@meta.ua" };
  try {
    await transporter.sendMail(email);
    console.log("email send");
    return true;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

module.exports = sendEmail;
