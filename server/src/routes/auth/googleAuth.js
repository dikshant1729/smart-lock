import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
  }),
  (req, res) => {
    res.redirect(`${process.env.BASE_URL}/auth/success?token=${req.user.token}`);
  }
);

// @route   GET /auth/failure
// @desc    Handle auth failure
router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Authentication Failed' });
});

// @route   GET /auth/success
// @desc    Success endpoint to get token
router.get('/success', (req, res) => {
  const token = req.query.token;
  res.status(200).json({
    message: 'Authentication Successful',
    token,
  });
});

export default router;
