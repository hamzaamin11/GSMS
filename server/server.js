// if (process.env.NODE_ENV !== 'production') {
// require('dotenv').config();
require("dotenv").config();
// }

// importing required packages & modules
const http = require("http");
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const { connectDB } = require("./api/config/db");

// importing routes
const authRoutes = require("./api/routes/auth.routes");
const userRoutes = require("./api/routes/user.routes");
const transcriptRoutes = require("./api/routes/transcript.routes");
const adminRoutes = require("./api/routes/admin.routes");

// initializng express app
const app = express();

// connect database
connectDB();

// middlewares
app.use(express.json({ extended: false }));
app.use(cors());
app.use(fileUpload());

// declare routes
app.get("/test", (req, res) => res.send("Running successfully"));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/transcript", transcriptRoutes);
app.use("/admin", adminRoutes);
// bas eik minute mujhey soch leney dein main kuch miss kar raha hun yaha........yh mera code ni zain ka ha us ka hi upload ni ho ra doc
// set post
app.set("port", process.env.PORT || 8088);

// create server
const server = http.createServer(app);
server.listen(app.get("port"), () =>
  console.log(`Server started on port ${app.get("port")}`)
);
