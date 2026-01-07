// backend/routes/auth.js
const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/v1/auth/signup
router.post('/signup', signup);

// POST /api/v1/auth/login   ← NEW
router.post('/login', login);

module.exports = router;
