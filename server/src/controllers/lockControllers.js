

exports.getLocks = (req, res) => {
    const { email } = req.body;
    const userLocks = locks.filter(lock => lock.email === email);
    res.status(200).json(userLocks);
};