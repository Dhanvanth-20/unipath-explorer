import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-googleId');
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};