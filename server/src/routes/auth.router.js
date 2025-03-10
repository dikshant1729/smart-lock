const { Router } = require("express");
const google = require("../controllers/auth/google");
const googleCallback = require("../controllers/auth/googleCallback");
const me = require("../controllers/auth/me");
const authenticate = require("../middleware/authenticate");
const authRouter = Router();

//@route    GET /api/auth/login
//@desc     redirect user to the google login
authRouter.get("/login", google);

//@route    GET /api/auth/callback
//@desc     get google token and get user details from the user
authRouter.get("/callback", googleCallback);

//@route    GET /api/auth
//@desc     fetch user from the db
authRouter.get("/", authenticate, me);

module.exports = authRouter;
