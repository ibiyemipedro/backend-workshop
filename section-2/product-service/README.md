# Product Service

A NestJS-based microservice for managing products and categories with JWT authentication, PostgreSQL database, and caching.

## Features

- **Product Management**: CRUD operations for products
- **Category Management**: CRUD operations for categories
- **JWT Authentication**: Secure API endpoints with token validation
- **PostgreSQL Database**: Persistent data storage with TypeORM
- **Caching**: Redis-compatible caching for improved performance
- **API Documentation**: Swagger/OpenAPI documentation
- **Input Validation**: Request validation using class-validator
- **Clean Architecture**: Organized code structure with repositories, services, and controllers

## API Endpoints

### Categories

- `POST /categories` - Create a new category
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Products

- `POST /products` - Create a new product
- `GET /products` - Get all products
- `GET /products?categoryId=:id` - Get products by category
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

### 1. Installation

```bash
# Navigate to the project directory
cd product-service

# Install dependencies
npm install
```

### 2. Environment Configuration

Copy the `.env` file and update the variables if needed:

```bash
# Database and application configuration is already set in .env file
# Default values:
# PORT=3001
# DB_HOST=localhost
# DB_PORT=5433
# DB_USERNAME=postgres
# DB_PASSWORD=password
# DB_NAME=product_db
# JWT_SECRET=your-jwt-secret-key
```

### 3. Start the Database

```bash
# Start PostgreSQL and pgAdmin containers
docker-compose up -d

# Verify containers are running
docker-compose ps
```

### 4. Run the Application

```bash
# Development mode with auto-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The application will be available at:

- **API**: http://localhost:3001
- **Swagger Documentation**: http://localhost:3001/api
- **pgAdmin**: http://localhost:5051 (admin@admin.com / admin)

### 5. Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## Database Access

### pgAdmin

- URL: http://localhost:5051
- Email: admin@admin.com
- Password: admin

### Database Connection (from pgAdmin)

- Host: postgres
- Port: 5432
- Database: product_db
- Username: postgres
- Password: password

## Authentication

All API endpoints require a valid JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

The JWT token should contain:

- `sub`: User ID
- `email`: User email
- `role`: User role

## Development

### Project Structure

```
src/
├── controllers/        # API controllers
├── services/          # Business logic
├── repositories/      # Data access layer
├── entities/          # TypeORM entities
├── dtos/              # Data transfer objects
├── utils/             # Utility functions and configurations
└── types/             # Type definitions
```

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with auto-reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Restart services
docker-compose restart
```

## API Documentation

Once the application is running, you can access the interactive API documentation at:
http://localhost:3001/api

This provides detailed information about all endpoints, request/response schemas, and allows you to test the API directly from the browser.
