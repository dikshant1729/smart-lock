//@route    POST /api/lock/password
//@desc     add a password for the lock if the password is null
const lockModel = require("../../models/lock.model");

module.exports = async (req, res) => {
    const { code, password } = req.body;

    try {
        await lockModel.findOneAndUpdate({ pairingCode: code }, { password });
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.log("addPassword.js", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
