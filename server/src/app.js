const express = require("express");
const cookieParser = require("cookie-parser");
const googleAuth = require("./routes/auth/googleAuth.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Global Health Check
app.get("/", (req, res) => {
    res.status(200).send("API is working!");
});

app.use("/auth", googleAuth);

module.exports = app;
