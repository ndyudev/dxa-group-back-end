const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, role, company, phone } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            fullName,
            email,
            password,
            role,
            company,
            phone
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '24h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        next(err);
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        next(err);
    }
};

// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        // req.user is set in the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}; 