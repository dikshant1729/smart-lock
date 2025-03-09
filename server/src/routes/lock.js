const express = require("express");
const router = express.Router();
const { addLock, getLocks, setPassword, deleteLock } = require("../controllers/lockController");

router.get("/", getLocks);

router.post("/", addLock);

router.post("/password", setPassword);

router.delete("/", deleteLock);

module.exports = router;
