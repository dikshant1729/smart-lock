const { Router } = require("express");
const axios = require("axios");
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;
const router = Router();

router.get("/google", (req, res) => {
    res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}`
    );
});

router.get("/google/callback", async (req, res) => {
    const code = req.query.code;

    try {
        const { data } = await axios({
            url: "https://oauth2.googleapis.com/token",
            method: "POST",
            params: {
                client_id,
                client_secret,
                redirect_uri,
                code,
                grant_type: "authorization_code",
            },
        });
        const token = data.access_token;
        const userData = await axios({
            url: `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${token}`,
            method: "GET",
        });

        res.cookie("token", token, {
            maxAge: Date.now() + data.expires_in * 1000,
            httpOnly: true,
            sameSite: "strict",
        });
        res.send({ user: userData.data });
    } catch (err) {
        console.log(err.message);
        res.send("fail");
    }
});

// @route   GET /auth/failure
// @desc    Handle auth failure
router.get("/failure", (req, res) => {
    res.status(401).json({ message: "Authentication Failed" });
});

// @route   GET /auth/success
// @desc    Success endpoint to get token
router.get("/success", (req, res) => {
    const token = req.query.token;
    res.status(200).json({
        message: "Authentication Successful",
        token,
    });
});

module.exports = router;
