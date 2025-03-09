const express = require("express");
const cookieParser = require("cookie-parser");
const googleAuth = require("./routes/auth/googleAuth.js");
const lockRoutes = require("./routes/lock.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Global Health Check
app.get("/", (req, res) => {
    res.status(200).send("API is working!");
});

app.use("/auth", googleAuth);
app.use("/lock", lockRoutes);

// /get -> all the locks present for the email
// /post -> add a lock {pairing} => check if email != null (already paired)
// /password -> set password {pairing code, password}
// /delete -> delete lock (email => null)

/*
{
    id: "",
    password : null,
    active: true,
    email: null
}
*/

//socket with lock
// on socket connection => store id on db
// on user gives pairing code => match db
// on matching, no password found => matching starts else already paired

// lock pairing
/*
- first user gives pairing code
- check if pairing exist or device is already paired
- password set
- password => encrypt => db
*/

// on user delete => password == null
//

/*
- login => :)
- 1 user -> multiple lock
- user -> email
- pair (socket id) -> password set
- socket -> password enter => script run => data to ml model => sucess/failure
*/

//lock open
/*
- socket connection 
- on request => script run 
- show sucess and failure
*/

//4 routes
// -> 2 route for lock pairing
// -> socket connection

module.exports = app;
