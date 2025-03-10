//@desc check if user is authorized to check route
const axios = require("axios");

module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const { data: userData } = await axios({
            url: `https://www.googleapis.com/drive/v3/about?fields=user&access_token=${token}`,
            method: "GET",
        });
        req.user = userData.user;
        next();
    } catch (err) {
        console.log("authenticate.js", err);
        res.status(401).json({ message: "Unauthorized" });
    }
};
