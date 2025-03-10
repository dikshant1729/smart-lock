//@route    GET /api/auth
//@desc     fetch and check if user is logged in or not

module.exports = async (req, res) => {
    res.status(200).json(req.user);
};
