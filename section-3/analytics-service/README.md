# Analytics Service

A TypeScript Express application demonstrating database operations with both MongoDB and PostgreSQL. This service provides analytics endpoints for ecommerce data, showcasing clean architecture patterns and dual database integration.

## Features

- **Dual Database Support**: PostgreSQL with TypeORM and MongoDB with Mongoose
- **Clean Architecture**: Separation of concerns with repositories, services, and controllers
- **API Documentation**: Swagger/OpenAPI documentation
- **Seeded Data**: Thousands of sample ecommerce records
- **Docker Support**: Containerized databases with management interfaces
- **Unit Testing**: Jest test suite with mocking
- **Type Safety**: Full TypeScript implementation

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Databases

```bash
docker-compose up -d
```

This starts:

- PostgreSQL (port 5432)
- pgAdmin (port 8080) - admin@admin.com / admin
- MongoDB (port 27017)
- Mongo Express (port 8081) - admin / admin123

### 3. Seed Databases

```bash
npm run seed
```

This creates thousands of sample records including users, categories, products, orders, and order items in both databases.

### 4. Start Application

```bash
# Development mode
npm run dev

# Production build
npm run build && npm start
```

Application runs on `http://localhost:3005`

## API Endpoints

### Health Check

- `GET /api/health` - Service health status

### PostgreSQL Analytics

- `GET /api/postgres/users` - User data with order relationships
- `GET /api/postgres/orders` - Order analytics and recent orders

### MongoDB Analytics

- `GET /api/mongo/user-categories` - User analytics by product categories
- `GET /api/mongo/product-analytics` - Product and order trend analytics

### Documentation

- `GET /api-docs` - Swagger UI documentation

## Database Schemas

### PostgreSQL Entities (TypeORM)

- **User**: User profiles with addresses and authentication
- **Category**: Product categories with hierarchical structure
- **Product**: Products with pricing and categorization
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items within orders

### MongoDB Models (Mongoose)

- **User**: User profiles (mirrored from PostgreSQL)
- **Category**: Product categories
- **Product**: Product catalog
- **Order**: Order records
- **OrderItem**: Order line items

## Architecture

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic layer
├── repositories/    # Data access layer
├── entities/        # TypeORM entities (PostgreSQL)
├── models/          # Mongoose models (MongoDB)
├── routes/          # API route definitions
├── utils/           # Database configs and utilities
├── types/           # TypeScript type definitions
├── migrations/      # Database migrations
└── seeds/           # Database seeding scripts
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3005

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=analytics_db
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=password

# MongoDB
MONGODB_URI=mongodb://root:password@localhost:27017/analytics_db?authSource=admin

# JWT
JWT_SECRET=analytics-jwt-secret-key
```

## Scripts

```bash
npm run dev          # Start in development mode
npm run build        # Build TypeScript
npm run start        # Start production build
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run seed         # Seed databases with sample data
```

## Docker Management

### Database Management Interfaces

**pgAdmin (PostgreSQL)**

- URL: http://localhost:8080
- Email: admin@admin.com
- Password: admin
- Server: analytics-postgres (postgres:5432)

**Mongo Express (MongoDB)**

- URL: http://localhost:8081
- Username: admin
- Password: admin123

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset data
docker-compose down -v
docker-compose up -d
```

## Testing

The service includes unit tests for services and controllers:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

## Development Workflow

1. **Start databases**: `docker-compose up -d`
2. **Install dependencies**: `npm install`
3. **Seed data**: `npm run seed`
4. **Start development**: `npm run dev`
5. **Test endpoints**: Visit `http://localhost:3005/api-docs`

## Key Learning Points

This service demonstrates:

- **Multi-database architecture** with PostgreSQL and MongoDB
- **ORM patterns** with TypeORM and Mongoose
- **Clean architecture** with repository pattern
- **API documentation** with Swagger
- **Database relationships** in both SQL and NoSQL contexts
- **Complex queries** and aggregations
- **Docker containerization** for development
- **Unit testing** with mocking strategies

## API Examples

### Get User Data (PostgreSQL)

```bash
curl http://localhost:3005/api/postgres/users
```

### Get Product Analytics (MongoDB)

```bash
curl http://localhost:3005/api/mongo/product-analytics
```

## Troubleshooting

### Database Connection Issues

- Ensure Docker containers are running: `docker-compose ps`
- Check database logs: `docker-compose logs postgres` or `docker-compose logs mongodb`
- Verify environment variables in `.env`

### TypeScript Errors

- Install dependencies: `npm install`
- Check TypeScript configuration: `npx tsc --noEmit`

### Seeding Issues

- Ensure databases are running and accessible
- Check connection strings in environment variables
- Run migrations if needed: `npm run typeorm migration:run`

## Contributing

1. Follow the established architecture patterns
2. Add unit tests for new features
3. Update API documentation for new endpoints
4. Follow TypeScript best practices

## License

ISC License - iO Workshop
