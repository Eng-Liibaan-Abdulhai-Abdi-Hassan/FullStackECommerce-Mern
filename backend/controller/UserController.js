const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  email,
  password,
  name,
  newpass,
  Email,
  confirpass,
} = require("../validation/validation");
const SendEmailOTP = require("../config/Nodemiler");
const GetAllUsers = async (id) => {
  let data = await User.find({ _id: { $ne: id } });
  return data;
};
const GetSignleUser = async (req, res) => {
  let data = await User.findById(req.body.Userid);
  res.send(data);
};
const SignUpUser = async (req, res) => {
  let { error: n } = name.validate({ Name: req.body.Name });
  if (n) return res.send(n.message);
  let { error: e } = email.validate({ Email: req.body.Email });
  if (e) return res.send(e.message);
  const UserExist = await User.findOne({ Email: req.body.Email });
  if (UserExist) return res.send("Email Already Exists");
  let { error: p } = password.validate({ Password: req.body.Password });
  if (p) return res.send(p.message);
  let { error: c } = confirpass.validate({
    ConfirmPassword: req.body.ConfirmPassword,
  });
  if (c) return res.send(c.message);
  if (
    req.body.Password !== req.body.ConfirmPassword ||
    req.body.ConfirmPassword !== req.body.Password
  )
    return res.send("Please Match  Your Passwords");
  const Name = await User.findOne({ Name: req.body.Name });
  if (Name) {
    const ismatch = await bcrypt.compare(req.body.Password, Name.Password);
    if (ismatch) return res.send("Password already is taken");
  }

  let randomnumber = Math.floor(10000 + Math.random() * 900000).toString();

  let newUser = new User({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Profile: req.body.Profile,
    GenVeriftyOp: randomnumber,
    OTPExpireAt: Date.now() + 10 * 60 * 1000,
  });

  SendEmailOTP(newUser.Email, newUser.GenVeriftyOp);
  let salt = await bcrypt.genSalt(10);
  if (req.body.Password) {
    newUser.Password = await bcrypt.hash(req.body.Password, salt);
  }

  await newUser.save();

  let token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    SameSite: "Login",
    expires: new Date("2025/7/4"),
  });
  res.send({
    status: true,
    error: false,
    message: "User Created Successfully",
    newUser,
  });
};
const Login = async (req, res) => {
  let { error: e } = Email.validate({ Email: req.body.Email });
  if (e) return res.send(e.message);
  const UserExist = await User.findOne({
    $or: [
      { Email: req.body.Email },
      {
        Name: req.body.Name,
      },
    ],
  });
  if (!UserExist) return res.send("User Not Found");
  let { error: p } = password.validate({ Password: req.body.Password });
  if (p) return res.send(p.message);

  let ismatch = await bcrypt.compare(req.body.Password, UserExist.Password);
  if (!ismatch) return res.send("Invalid Credentials ");
  let token = jwt.sign(
    {
      id: UserExist._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    SameSite: "Login",
    expires: new Date("2025/7/4"),
  });

  const { Password, ...info } = UserExist._doc;

  res.send({
    status: true,
    error: false,
    message: "Successfully Logged In",
    ...info,
    token,
  });
};
const Change = async (req, res) => {
  let { error: e } = Email.validate({ Email: req.body.Email });
  if (e) return res.send(e.message);
  const UserExist = await User.findOne({
    $or: [
      { Email: req.body.Email },
      {
        Name: req.body.Name,
      },
    ],
  });
  if (!UserExist) return res.send("User Not Found");
  let { error: p } = password.validate({ Password: req.body.Password });
  if (p) return res.send(p.message);

  let ismatch = await bcrypt.compare(req.body.Password, UserExist.Password);
  if (!ismatch) return res.send("Invalid Credentials ");
  const { Password, ...info } = UserExist._doc;

  const salt = await bcrypt.genSalt(10);

  let { error: newp } = newpass.validate({ NewPassword: req.body.NewPassword });
  if (newp) return res.send(newp.message);

  const update = await User.findByIdAndUpdate(
    UserExist._id,
    {
      Password: await bcrypt.hash(req.body.NewPassword, salt),
    },
    {
      new: true,
    }
  );
  await update.save();
  res.send({
    status: true,
    error: false,
    message: "Successfully Change Password",
    ...info,
  });
};
const UpdateUser = async (data) => {
  let updateUser = await User.findByIdAndUpdate(data?.Userid, data, {
    new: true,
  });

  return await updateUser.save();
};
const Logout = async (req, res) => {
  res.clearCookie("token");
  res.send({
    status: true,
    error: false,
    message: "Successfully logged out",
  });
};
const DeleteUser = async (data) => {
  let deleteUser = await User.findByIdAndDelete(data);
  return deleteUser;
};

const VerityOTP = async (req, res) => {
  let { GenVeriftyOp } = req.body;
  let user = await User.findOne({ GenVeriftyOp });
  if (!user) return res.send("invalid otp");
  if (user.OTPExpireAt < Date.now()) return res.send("expired otp");
  await User.findByIdAndUpdate(user._id, {
    GenVeriftyOp: null,
    OTPExpireAt: null,
    VerifyOtp: true,
  });
  res.send({
    status: true,
    error: false,
    message: "OTP verified successfully",
  });
};

module.exports = {
  GetAllUsers,
  GetSignleUser,
  SignUpUser,
  UpdateUser,
  DeleteUser,
  Login,
  Change,
  Logout,
  VerityOTP,
  // Other routes...
};
