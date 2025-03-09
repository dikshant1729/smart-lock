import cookieParser from 'cookie-parser';
import express from 'express';

import googleAuth from './routes/auth/googleAuth.js';
import('./config/passport.js');
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use('/auth', googleAuth);

// Global Health Check
app.get('/', (req, res) => {
  res.status(200).send('API is working!');
});

export default app;
