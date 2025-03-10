//@route    POST /api/lock
//@desc     add a lock to the user

const userModel = require("../../models/user.model");
const lockModel = require("../../models/lock.model");

module.exports = async (req, res) => {
    const { emailAddress: email } = req.user;
    const { name, code } = req.body;

    try {
        const lock = await lockModel.findOne({ pairingCode: code });
        if (!lock) return res.status(400).json({ message: "Invalid code" });

        await userModel.updateOne(
            { email },
            { $push: { locks: { name, id: lock._id } } }
        );

        res.status(200).json({ message: "Lock added Successfully" });
    } catch (err) {
        console.log("addLock.js", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
