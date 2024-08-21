const express = require('express');
const {
  fetchMoviesFromTMDB,
  fetchTrendingMovies,
  fetchPopularGenres,
  getMovieDetails,
  addToWatchlist,
  getWatchlist,
  getRecommendedMovies,
  getSimilarMovies,
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', fetchMoviesFromTMDB);
router.get('/trending', fetchTrendingMovies); // Route for trending movies
router.get('/genres', fetchPopularGenres); // Route for popular genres
router.get('/:id', getMovieDetails);
router.post('/:userId/watchlist', protect, addToWatchlist);
router.get('/:userId/watchlist', protect, getWatchlist);
router.get('/recommendations/:id', getRecommendedMovies); // Route for recommendations
router.get('/similar/:id', getSimilarMovies); // Route for similar movies

module.exports = router;
