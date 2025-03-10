const express = require("express");

const authenticate = require("../middleware/authenticate");

const getLock = require("../controllers/lock/getLock");
const addLock = require("../controllers/lock/addLock");
const addPassword = require("../controllers/lock/addPassword");
const deleteLock = require("../controllers/lock/deleteLock");

const router = express.Router();

//@route    GET /api/lock
//@desc     fetch all the lock present for the user
router.get("/", authenticate, getLock);

//@route    POST /api/lock
//@desc     add a lock to the user
router.post("/", authenticate, addLock);

//@route    POST /api/lock/password
//@desc     add a password for the lock if the password is null
router.post("/password", authenticate, addPassword);

//@route    DELETE /api/lock
//@desc     delete a lock from the user
router.delete("/", authenticate, deleteLock);

//@route    GET /api/lock/open
//@desc     open the lock for the user if he is in the range
router.get("/open", authenticate);

module.exports = router;
