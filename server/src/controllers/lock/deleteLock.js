//@route    DELETE /api/lock
//@desc     delete a lock from the user
const userModel = require("../../models/user.model");

module.exports = async (req, res) => {
    const { emailAddress: email } = req.user;
    const { id } = req.body;

    try {
        await userModel.findOneAndUpdate(
            { email },
            { $pull: { locks: { id } } }
        );
        res.status(200).json({ message: "Lock deleted Successfully" });
    } catch (err) {
        console.log("deleteLock.js", err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
