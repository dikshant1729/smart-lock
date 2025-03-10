//@route    GET /api/auth
//@desc     fetch and check if user is logged in or not

const axios = require("axios");

module.exports = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Token not found" });

    try {
        const userData = await axios({
            url: `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${token}`,
            method: "GET",
        });

        res.status(200).json({ user: userData.data });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
    }
};
