const jwt = require("jsonwebtoken");
const Protocol = (req, res, next) => {
  let token = req.headers.cookie && req.headers.cookie.split("=")[1];
  if (!token) return res.send("Please Login ");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.send("Invalid token");
    req.user = user.id;
    next();
  });
};
module.exports = Protocol;
