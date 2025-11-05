const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

function createToken(user) {
  return jwt.sign({ id: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, username, password, confirmPassword } = req.body;
    if (!full_name || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) return res.status(409).json({ error: 'Email already registered' });

    const usernameExists = await User.findOne({ username: username.trim() });
    if (usernameExists) return res.status(409).json({ error: 'Username already taken' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({
      full_name: full_name.trim(),
      email: email.toLowerCase().trim(),
      username: username.trim(),
      password: hashed
    });
    await newUser.save();

    const token = createToken(newUser);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login (username or email)
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ error: 'Please provide username/email and password' });

    const user = await User.findOne({ $or: [{ email: identifier.toLowerCase() }, { username: identifier.trim() }] });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = createToken(user);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const authMiddleware = require('../middleware/auth');

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
