const express = require('express');
const { registerUser, authUser, requestPasswordReset, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/request-reset', requestPasswordReset); // New route for requesting password reset
router.post('/reset-password', resetPassword); // New route for resetting password

module.exports = router;
