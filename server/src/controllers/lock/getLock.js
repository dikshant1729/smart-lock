//@route    GET /api/lock
//@desc     find the locks present for the user

const userModel = require("../../models/user.model");

module.exports = async (req, res) => {
    const { emailAddress: email } = req.user;

    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User does not exists" });

        res.status(200).json({ locks: user.locks });
    } catch (err) {
        console.log("getLock.js", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
