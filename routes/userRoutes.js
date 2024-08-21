const express = require('express');
const { getUserProfile, updatePreferences, updateUserDetails, addToWatchlist, getWatchlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user profile
router.get('/profile', protect, getUserProfile);

// Route to update user preferences
router.patch('/preferences', protect, updatePreferences);

// Route to update user details (e.g., email, username)
router.patch('/', protect, updateUserDetails);

// Route to add a movie to the watchlist
router.post('/watchlist', protect, addToWatchlist);

// Route to get the user's watchlist
router.get('/watchlist', protect, getWatchlist);

module.exports = router;
