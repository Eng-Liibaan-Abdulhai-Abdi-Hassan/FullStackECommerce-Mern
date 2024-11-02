let MyPass = "vkms oqqc qgrd nmms";
let MyGmail = "libanahmed0008@gmail.com";
const nodemailer = require("nodemailer");
const Transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MyGmail,
    pass: MyPass,
  },
});
const SendEmailOTP = async (Email, GenOTP) => {
  let userinfo = await Transport.sendMail({
    from: MyGmail,
    to: Email,
    subject: "Your Email Verification OTP",
    text: `Your Verification Code OTP is: ${GenOTP}. It Will Expire in 10 Minutes`,
    html: `<br>Your Verification Code OTP is: ${GenOTP}. It Will Expire in 10 Minutes </br>`,
  });
  return userinfo;
};

module.exports = SendEmailOTP;
