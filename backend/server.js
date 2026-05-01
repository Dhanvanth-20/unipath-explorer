import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

import User from './models/User.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/auth/google/callback',
        proxy: true
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos?.[0]?.value || ''
                });
                await user.save();
            }
            done(null, user);
        } catch (err) {
            console.error('Google Strategy Error:', err);
            done(err, null);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Auth Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    (req, res, next) => {
        console.log('Callback hit, query:', req.query);
        next();
    },
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    async(req, res) => {
        try {
            const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
        } catch (err) {
            console.error('Callback Error:', err);
            res.redirect(`${process.env.FRONTEND_URL}/login`);
        }
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err });
        res.clearCookie('jwt');
        res.redirect(process.env.FRONTEND_URL);
    });
});

// Email/Password Auth Routes
app.post('/api/auth/signup', async(req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const user = new User({
            email,
            password,
            name: name || email.split('@')[0]
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

app.post('/api/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/api/user', authenticateToken, async(req, res) => {
    res.json(req.user);
});

// Protect API endpoints
app.get('/api/countries', authenticateToken, (req, res) => {
    res.json({
        countries: [
            { id: 'usa', name: 'United States', tuitionRange: '$10,000 - $55,000', livingCost: '$1,000 - $2,500/month' },
            { id: 'uk', name: 'United Kingdom', tuitionRange: '$10,000 - $35,000', livingCost: '$1,200 - $2,000/month' },
            { id: 'canada', name: 'Canada', tuitionRange: '$8,000 - $30,000', livingCost: '$1,000 - $2,000/month' },
            { id: 'australia', name: 'Australia', tuitionRange: '$10,000 - $35,000', livingCost: '$1,500 - $2,500/month' },
            { id: 'germany', name: 'Germany', tuitionRange: '$0 - $5,000', livingCost: '$900 - $1,500/month' }
        ]
    });
});

app.get('/api/universities', authenticateToken, (req, res) => {
    res.json({
        universities: [
            { id: 1, name: 'Harvard University', country: 'USA', ranking: 1, tuition: 55000 },
            { id: 2, name: 'University of Oxford', country: 'UK', ranking: 2, tuition: 35000 },
            { id: 3, name: 'MIT', country: 'USA', ranking: 3, tuition: 57500 },
            { id: 4, name: 'Stanford University', country: 'USA', ranking: 4, tuition: 56100 },
            { id: 5, name: 'University of Cambridge', country: 'UK', ranking: 5, tuition: 38000 }
        ]
    });
});

app.post('/api/eligibility', authenticateToken, (req, res) => {
    const { gpa, greScore, toeflScore, budget } = req.body;
    // logic...
    const results = [];
    if (gpa >= 3.5 && budget >= 50000) results.push({ country: 'USA', universities: 50, eligibility: 'High' });
    if (gpa >= 3.0 && budget >= 30000) results.push({ country: 'UK', universities: 30, eligibility: 'Medium' });
    if (gpa >= 3.0 && budget >= 25000) results.push({ country: 'Canada', universities: 25, eligibility: 'Medium' });
    if (budget >= 10000) results.push({ country: 'Germany', universities: 20, eligibility: 'High' });
    res.json({ eligible: results });
});

app.post('/api/calculate-cost', authenticateToken, (req, res) => {
    const { country, university, duration, livingStyle } = req.body;
    const tuitionPerYear = 20000;
    const livingMultiplier = livingStyle === 'luxury' ? 2 : livingStyle === 'budget' ? 0.7 : 1;
    const livingPerMonth = 1500 * livingMultiplier;
    const total = {
        tuition: tuitionPerYear * duration,
        living: livingPerMonth * 12 * duration,
        total: (tuitionPerYear * duration) + (livingPerMonth * 12 * duration)
    };
    res.json(total);
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Silence Chrome DevTools probe
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => res.json({}));

// Health check (public)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'UniPath Explorer API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`UniPath Explorer API running on port ${PORT}`);
});