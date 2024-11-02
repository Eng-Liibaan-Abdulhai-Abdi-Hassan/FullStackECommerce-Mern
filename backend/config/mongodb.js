const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB);
console.log("Successfully Connected MOGODB Database");
module.exports = db;
