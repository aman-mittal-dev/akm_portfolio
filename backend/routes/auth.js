const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Simple in-memory admin (In production, use a database)
const ADMIN_USER = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || '$2a$10$rOzJqJqQJqQJqQJqQJqQJO' // Default: 'admin123'
};

// Login endpoint
router.post('/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check credentials (In production, validate against database)
    if (username === ADMIN_USER.username) {
      // Check password - if ADMIN_PASSWORD is set in env, use it directly for simplicity
      // In production, always hash passwords with bcrypt
      const envPassword = process.env.ADMIN_PASSWORD;
      let isValidPassword = false;
      
      if (envPassword && envPassword.startsWith('$2a$')) {
        // Hashed password in env
        isValidPassword = await bcrypt.compare(password, envPassword);
      } else {
        // Plain password check (default for development)
        isValidPassword = password === (envPassword || 'admin123');
      }

      if (isValidPassword) {
        const token = jwt.sign(
          { username: username, role: 'admin' },
          process.env.JWT_SECRET || 'your-secret-key',
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;

