# theHub Server

A modern, secure backend for theHub - an online platform connecting hobbyists and collectors to share projects, learn skills, and build community.

## Overview

theHub server provides a robust API backbone for the theHub application with the following features:

- **Secure authentication** with email/password and Google OAuth
- **User management** with profiles, skills, and ranking system
- **High performance** through Node.js clustering across multiple CPU cores
- **RESTful API design** with intuitive endpoints and versioning
- **Clean separation of concerns** with MVC-inspired architecture

## Installation

```bash
# Clone the repository
git clone https://github.com/xisvar/theHub.git
cd theHub/server

# Install dependencies
npm install

# Set up environment variables (copy template)
cp .env.example .env

# Edit your environment variables
# Edit the .env file with your configuration settings
```

## Environment Configuration

Create a `.env` file with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/theHub
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/sign-up` | Register a new user with email and password |
| POST | `/api/v1/auth/sign-in` | Authenticate and get access token |
| POST | `/api/v1/auth/google-sign-up` | Register/login with Google |
| POST | `/api/v1/auth/sign-out` | Logout the current user |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user/profile` | Get current user profile |
| PUT | `/api/v1/user/profile` | Update user profile |
| GET | `/api/v1/user/skills` | Get user skills |

## Architecture

The server follows a layered architecture:

- **Routes**: Define API endpoints and HTTP methods
- **Controllers**: Handle business logic and request processing
- **Models**: Define data structure and database interactions
- **Middlewares**: Process requests, handle errors, and validate data

## Performance Optimization

The server uses Node.js clustering to distribute load across multiple CPU cores:

- Master process manages worker lifecycle
- Worker processes handle incoming requests
- Automatic replacement of crashed workers
- Graceful shutdown handling

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- Secure error handling
- Rate limiting (coming soon)

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Generate documentation
npm run docs
```

## Documentation

Full API documentation is available after running:

```bash
npm run docs
```

This will generate documentation in the out directory and can be viewed by opening index.html in a browser.

## License

This project is licensed under the MIT License - see the LICENSE file for details.