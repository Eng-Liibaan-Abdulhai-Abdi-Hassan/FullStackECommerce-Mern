const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userschema = new Schema(
  {
    Name: String,
    Email: String,
    Password: String,
    Profile: [],
    Role: {
      type: String,
      default: "User",
    },
    GenVeriftyOp: String,
    VerifyOtp: {
      type: Boolean,
      default: false,
    },
    OTPExpireAt: String,
  },
  { timestamps: true }
);
module.exports = model("user", userschema);
