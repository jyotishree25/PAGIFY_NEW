// backend/routes/user.js
const express = require('express');
const auth = require('../middleware/auth');
const { getMe, updateMe, changePassword } = require('../controllers/userController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/me', auth, getMe);
router.patch('/me', auth, updateMe);
router.patch('/change-password', auth, changePassword);

module.exports = router;
