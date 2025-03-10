const express = require("express");
const router = express.Router();

//@route    GET /api/lock
//@desc     fetch all the lock present for the user
router.get("/");

//@route    POST /api/lock
//@desc     add a lock to the user
router.post("/");

//@route    POST /api/lock/password
//@desc     add a password for the lock if the password is null
router.post("/password");

//@route    DELETE /api/lock
//@desc     delete a lock from the user
router.delete("/");

//@route    GET /api/lock/open
//@desc     open the lock for the user if he is in the range
router.get("/open");

module.exports = router;
