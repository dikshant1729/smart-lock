//@route    GET /api/auth/login
//@desc     redirect user to the google account page

module.exports = (req, res) => {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

    res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}`
    );
};
