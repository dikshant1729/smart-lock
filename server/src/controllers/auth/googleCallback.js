//@route    GET /api/auth/callback
//@desc     get user data from the google token

const axios = require("axios");
const userModel = require("../../models/user.model");

module.exports = async (req, res) => {
    const code = req.query.code;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

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
        const { data: userData } = await axios({
            url: `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${token}`,
            method: "GET",
        });
        const user = await userModel.findOne({
            email: userData.user.emailAddress,
        });
        if (!user)
            await userModel.create({ email: userData.user.emailAddress });

        res.cookie("token", token, {
            maxAge: Date.now() + data.expires_in * 1000,
            httpOnly: true,
            sameSite: "strict",
        });
        res.status(200).json({ user: userData.user });
    } catch (err) {
        console.log("googleCallback.js", err);
        res.status(500).json({ message: "failed" });
    }
};
