## Movie Backend Overview

The backend for your movie application is designed to manage user authentication, movie data, and user-specific features such as watchlists. It includes functionality for handling user accounts, managing movies, and implementing caching for efficient data retrieval. Here's a breakdown of the components:

### 1. **Database Configuration (`backend/config/db.js`)**

This file sets up a connection to a MongoDB database using Mongoose. It connects to the database using a URI specified in the environment variables and handles connection errors. 

- **Connection Setup**: Uses `mongoose.connect()` to connect to MongoDB.
- **Error Handling**: Logs connection errors and exits the process if the connection fails.

### 2. **Authentication Controller (`backend/controllers/authController.js`)**

Handles user-related operations such as registration, authentication, and password management.

- **Register User**: Checks if a user already exists; if not, creates a new user and saves it to the database, returning a token for authentication.
- **Authenticate User**: Validates user credentials and returns a token if the credentials are correct.
- **Request Password Reset**: Verifies if the email is registered for a user.
- **Reset Password**: Allows users to reset their password by providing a new password.

### 3. **Movie Controller (`backend/controllers/movieController.js`)**

Manages movie-related functionalities and integrates with The Movie Database (TMDb) API.

- **Fetch Movies**: Retrieves movies based on a search query with pagination and caching to reduce redundant API calls.
- **Fetch Trending Movies**: Gets trending movies with caching.
- **Fetch Popular Genres**: Fetches and caches popular genres.
- **Get Movie Details**: Retrieves detailed information about a specific movie.
- **Add to Watchlist**: Adds a movie to a user's watchlist.
- **Get Watchlist**: Retrieves the user's watchlist.
- **Get Recommended Movies**: Fetches movie recommendations based on a given movie ID.
- **Get Similar Movies**: Fetches movies similar to a given movie ID.

### 4. **User Controller (`backend/controllers/userController.js`)**

Handles user profile management and updates.

- **Get User Profile**: Retrieves user details such as username, email, preferences, and watchlist.
- **Update Preferences**: Allows users to update their preferences.
- **Update User Details**: Enables users to update their email and username.
- **Add to Watchlist**: Adds a movie to the user's watchlist.
- **Get Watchlist**: Retrieves the user's watchlist.

### 5. **Authentication Middleware (`backend/middleware/authMiddleware.js`)**

Protects routes by verifying the user's authentication token.

- **Protect**: Middleware function that checks for a valid JWT token and attaches the user to the request if the token is valid.

### 6. **Error Handling Middleware (`backend/middleware/errorMiddleware.js`)**

Handles errors and sends appropriate responses to clients.

- **Error Handler**: Captures errors, logs them, and sends a JSON response with the error message.

### 7. **Models**

Defines the schema for MongoDB collections.

- **Movie Model (`backend/models/Movie.js`)**: Schema for storing movie details such as title, overview, poster path, TMDB ID, release date, genres, and rating.
- **User Model (`backend/models/User.js`)**: Schema for storing user details including username, email, password (hashed), preferences, and watchlist. Includes methods for password hashing and comparison.

### 8. **Routes**

Defines API endpoints and associates them with controller functions.

- **Auth Routes (`backend/routes/authRoutes.js`)**: Handles user registration, authentication, and password reset requests.
- **Movie Routes (`backend/routes/movieRoutes.js`)**: Handles movie search, trending movies, genre retrieval, movie details, watchlist management, and recommendations.
- **User Routes (`backend/routes/userRoutes.js`)**: Manages user profile retrieval and updates, preferences, and watchlist management.

### 9. **Utilities**

Provides helper functions and configurations.

- **Generate Token (`backend/utils/generateToken.js`)**: Generates a JWT token for authenticated users.

### 10. **Server Configuration (`backend/server.js`)**

Sets up the Express server with various middlewares and routes.

- **Configuration**: Loads environment variables, connects to the database, sets up middlewares (e.g., CORS, helmet, xss-clean), and configures rate limiting.
- **Caching**: Uses `node-cache` for caching movie data to improve performance.
- **Logging**: Utilizes `winston` for logging errors and other information.
- **Port**: Listens on a specified port (default 5000).

### Summary

This backend setup provides a comprehensive solution for managing a movie application, including user management, movie data handling, and caching. It integrates with TMDb to fetch movie data and uses MongoDB for storing user and movie information. The inclusion of middleware for authentication and error handling ensures robust and secure operations.
