const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET;

// Login strictly uses .env credentials
const ADMIN_USER = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

// Login endpoint
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    if (!JWT_SECRET || !ADMIN_USER.username || !ADMIN_USER.password) {
      return res.status(500).json({
        message: 'Server auth is not configured. Please set JWT_SECRET, ADMIN_USERNAME, and ADMIN_PASSWORD in backend/.env',
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check credentials (In production, validate against database)
    if (username === ADMIN_USER.username) {
      // Check password - if ADMIN_PASSWORD is set in env, use it directly for simplicity
      // In production, always hash passwords with bcrypt
      const envPassword = ADMIN_USER.password;
      let isValidPassword = false;
      
      if (envPassword && envPassword.startsWith('$2a$')) {
        // Hashed password in env
        isValidPassword = await bcrypt.compare(password, envPassword);
      } else {
        // Plain password check (default for development)
        isValidPassword = password === (envPassword);
      }

      if (isValidPassword) {
        const token = jwt.sign(
          { username: username, role: 'admin' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.json({
          message: 'Login successful',
          token: token,
          user: { username: username, role: 'admin' }
        });
      }
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;

