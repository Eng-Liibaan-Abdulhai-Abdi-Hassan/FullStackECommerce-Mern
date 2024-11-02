const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const db = require("./config/mongodb");
const { server, app } = require("./config/socket");
app.use(cors({ origin: "http://localhost:4000", Credential: true }));
let PORT = 3000 || process.env.PORT;
app.use(express.json({ limit: "50mb" }));
app.use("/api/user", require("./routes/UserRoutes"));
app.use("/api/category", require("./routes/CategoryRoutes"));
app.use("/api/product", require("./routes/ProductRoutes"));
app.use("/api/product", require("./routes/ProductCategoryRoutes"));
app.use("/api/addcart", require("./routes/AddCartRoutes"));
app.use("/api/order", require("./routes/OrderRoutes"));
// app.use(express.static(path.join(__dirname, "../frontend/dist")))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// });
server.listen(PORT, db, () => console.log("listening on port 3000"));
