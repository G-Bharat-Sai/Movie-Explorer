const axios = require('axios');
const User = require('../models/User');
const NodeCache = require('node-cache'); // Import the NodeCache class
const cache = new NodeCache(); // Instantiate NodeCache

// Fetch movies from TMDb with pagination and caching
const fetchMoviesFromTMDB = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const cacheKey = `movies_${query}_page${page}_limit${limit}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search/movie`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query,
        page,
        include_adult: false, // Optional, exclude adult content if needed
      },
    });

    // Implement pagination
    const totalResults = response.data.total_results;
    const totalPages = response.data.total_pages;
    const movies = response.data.results.slice(0, limit);

    const result = {
      page: parseInt(page, 10),
      totalPages,
      totalResults,
      results: movies,
    };

    cache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

// Fetch trending movies
const fetchTrendingMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const cacheKey = `trending_movies_page${page}_limit${limit}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/trending/movie/day`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page,
      },
    });

    // Implement pagination
    const totalResults = response.data.total_results;
    const totalPages = response.data.total_pages;
    const movies = response.data.results.slice(0, limit);

    const result = {
      page: parseInt(page, 10),
      totalPages,
      totalResults,
      results: movies,
    };

    cache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending movies' });
  }
};

// Fetch popular genres
const fetchPopularGenres = async (req, res) => {
  try {
    const cacheKey = 'popular_genres';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    const genres = response.data.genres;

    cache.set(cacheKey, genres);
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular genres' });
  }
};

// Get movie details from TMDb
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie details' });
  }
};

// Add a movie to the watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
};

// Get the user's watchlist
const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('watchlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
};

// Get recommended movies based on a movie ID with pagination
const getRecommendedMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movie/${id}/recommendations`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page,
      },
    });

    // Implement pagination
    const totalResults = response.data.total_results;
    const totalPages = response.data.total_pages;
    const recommendations = response.data.results.slice(0, limit);

    res.json({
      page: parseInt(page, 10),
      totalPages,
      totalResults,
      results: recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommended movies' });
  }
};

// Get similar movies based on a movie ID with pagination
const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page,
      },
    });

    // Implement pagination
    const totalResults = response.data.total_results;
    const totalPages = response.data.total_pages;
    const similarMovies = response.data.results.slice(0, limit);

    res.json({
      page: parseInt(page, 10),
      totalPages,
      totalResults,
      results: similarMovies,
    });
  } catch (error) {
    console.error('Error fetching similar movies:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching similar movies' });
  }
};

module.exports = {
  fetchMoviesFromTMDB,
  fetchTrendingMovies,
  fetchPopularGenres,
  getMovieDetails,
  addToWatchlist,
  getWatchlist,
  getRecommendedMovies,
  getSimilarMovies,
};
