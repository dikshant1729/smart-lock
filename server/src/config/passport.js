const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            // Generate JWT Token for user
            const token = jwt.sign(
                {
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Pass the token to the done callback
            return done(null, { token });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
