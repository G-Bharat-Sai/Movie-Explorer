const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String },
  poster_path: { type: String },
  tmdb_id: { type: Number, unique: true },
  release_date: { type: Date },
  genres: { type: [String] },
  rating: { type: Number },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
