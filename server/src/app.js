const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.router.js");
const lockRoutes = require("./routes/lock.router.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Global Health Check
app.get("/", (req, res) => {
    res.status(200).send("API is working!");
});

app.use("/api/auth", authRouter);
app.use("/api/lock", lockRoutes);

module.exports = app;

