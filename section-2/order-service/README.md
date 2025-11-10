# Order Service

A minimal order management and cart service built with Express.js, TypeScript, PostgreSQL, and TypeORM. This microservice handles order creation, cart management, and provides JWT-based authentication.

## Features

- **Order Management**: Create orders, view orders, update order status
- **Cart Management**: Add to cart, remove from cart, update cart items
- **JWT Authentication**: Secure endpoints with JWT token validation
- **PostgreSQL Database**: Persistent data storage with TypeORM
- **Swagger Documentation**: Auto-generated API documentation
- **Docker Support**: Containerized database with PgAdmin
- **Unit Tests**: Jest-based testing suite

## Architecture

The service follows a clean architecture pattern:

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── entities/        # Database entities
├── dtos/           # Data transfer objects
├── routes/         # Express route definitions
├── utils/          # Utility functions
└── types/          # TypeScript type definitions
```

## Prerequisites

- Node.js 16+
- Docker and Docker Compose
- PostgreSQL (via Docker)

## Installation

1. **Clone and navigate to the project:**

   ```bash
   cd order-service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the database:**

   ```bash
   docker-compose up -d
   ```

5. **Build the application:**
   ```bash
   npm run build
   ```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Run Tests

```bash
npm test
```

### Watch Mode for Development

```bash
npm run dev:watch
```

## API Endpoints

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id/status` - Update order status

### Cart

- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get user cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/product/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Documentation

- `GET /api/docs` - Swagger API documentation
- `GET /health` - Health check endpoint

## Database Schema

### Orders Table

- `id` - Primary key
- `userId` - User identifier
- `status` - Order status (pending, confirmed, processing, shipped, delivered, cancelled)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Order Items Table

- `id` - Primary key
- `orderId` - Foreign key to orders
- `productId` - Product identifier
- `price` - Item price
- `quantity` - Item quantity
- `status` - Item status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Cart Table

- `id` - Primary key
- `userId` - User identifier
- `productId` - Product identifier
- `price` - Item price
- `quantity` - Item quantity
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Authentication

All endpoints (except health check and documentation) require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

The JWT payload should contain:

```json
{
  "id": "user_id",
  "email": "user_email",
  "role": "user_role"
}
```

## Environment Variables

| Variable      | Description       | Default           |
| ------------- | ----------------- | ----------------- |
| `NODE_ENV`    | Environment mode  | `development`     |
| `PORT`        | Server port       | `3003`            |
| `DB_HOST`     | Database host     | `localhost`       |
| `DB_PORT`     | Database port     | `5433`            |
| `DB_USERNAME` | Database username | `orderuser`       |
| `DB_PASSWORD` | Database password | `orderpassword`   |
| `DB_NAME`     | Database name     | `orderdb`         |
| `JWT_SECRET`  | JWT secret key    | `your-secret-key` |

## Docker Services

The `docker-compose.yml` includes:

- **PostgreSQL** (port 5433): Main database
- **PgAdmin** (port 5051): Database administration interface
  - Email: admin@orderservice.com
  - Password: admin123

## Development Workflow

1. **Start the database:**

   ```bash
   docker-compose up -d
   ```

2. **Run in development mode:**

   ```bash
   npm run dev
   ```

3. **Access services:**

   - API: http://localhost:3003
   - Documentation: http://localhost:3003/api/docs
   - PgAdmin: http://localhost:5051

4. **Run tests:**
   ```bash
   npm test
   ```

## Service Integration

This service is designed to work with other microservices:

- **User Service**: For user authentication and profile data
- **Product Service**: For product information and availability
- **Notification Service**: For order status notifications

### Inter-service Communication

- Services communicate using JWT tokens for authentication
- Use HTTP REST APIs for synchronous communication
- Consider implementing message queues for asynchronous operations

## Error Handling

The service includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Not Found Errors**: 404 Not Found
- **Server Errors**: 500 Internal Server Error

All responses follow a consistent format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": "Response data (if success)",
  "error": "Error message (if failure)"
}
```

## Testing

The service includes unit tests for:

- Service layer business logic
- Controller request handling
- Repository data access patterns

Run specific test suites:

```bash
npm test -- order.service.test.ts
npm test -- cart.service.test.ts
npm test -- order.controller.test.ts
```

## Performance Considerations

- Database indexes on frequently queried columns
- Connection pooling for database connections
- Pagination for large result sets (implement as needed)
- Caching layer for frequently accessed data (implement as needed)

## Security Features

- Helmet for security headers
- CORS configuration
- JWT token validation
- Input validation with Joi
- SQL injection prevention with TypeORM

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment-specific configuration
3. Enable database SSL connections
4. Set up proper logging
5. Configure reverse proxy (nginx/traefik)
6. Set up monitoring and health checks

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Ensure Docker services are running: `docker-compose ps`
   - Check database credentials in `.env`

2. **Port Already in Use**

   - Change PORT in `.env` or stop conflicting services

3. **JWT Validation Errors**
   - Verify JWT_SECRET matches across services
   - Check token expiration and format

### Logs

Enable detailed logging in development:

```bash
NODE_ENV=development npm run dev
```

## Contributing

1. Follow the established code structure
2. Add tests for new features
3. Update documentation as needed
4. Use TypeScript for type safety
5. Follow the existing error handling patterns
