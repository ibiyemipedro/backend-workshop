# User Service

A minimal Express.js user service with TypeScript, MongoDB, and JWT authentication following clean architecture principles.

## Features

- User registration and authentication
- JWT token-based authorization
- Password hashing with bcrypt
- Input validation with Joi
- Swagger API documentation
- Clean architecture (Repository, Service, Controller pattern)
- Docker support for MongoDB
- Unit tests with Jest

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB with Docker

```bash
npm run docker:up
```

This will start:

- MongoDB on port 27017
- Mongo Express (web UI) on port 8081

### 3. Environment Setup

Copy the `.env` file and update as needed:

```bash
# The .env file is already configured for local development
```

### 4. Development

```bash
npm run dev
```

The service will start on http://localhost:3001

### 5. API Documentation

Visit http://localhost:3001/api-docs to view the Swagger documentation.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services

## API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password with code

### User Management (Requires Authentication)

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update password

### Health Check

- `GET /health` - Service health check

## Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Mongoose schemas
├── repositories/   # Data access layer
├── routes/         # Route definitions
├── services/       # Business logic
├── types/          # TypeScript interfaces
├── utils/          # Utilities and middleware
├── validation/     # Input validation schemas
└── app.ts          # Express app setup

__tests__/          # Unit tests
```

## Environment Variables

| Variable       | Description               | Default                               |
| -------------- | ------------------------- | ------------------------------------- |
| PORT           | Server port               | 3001                                  |
| MONGODB_URI    | MongoDB connection string | mongodb://localhost:27017/userservice |
| JWT_SECRET     | JWT signing secret        | your_super_secret_jwt_key_here        |
| JWT_EXPIRES_IN | JWT expiration time       | 7d                                    |
| BCRYPT_ROUNDS  | Bcrypt hash rounds        | 12                                    |

## Database Access

- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081
  - Username: admin
  - Password: password123

## Testing

Run the test suite:

```bash
npm test
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Helmet.js security headers
- Request rate limiting ready

## Development Notes

- The service uses clean architecture principles
- Repository pattern for data access
- Service classes for business logic
- Functional controllers for HTTP handling
- Comprehensive error handling
- TypeScript for type safety
