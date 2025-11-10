# Notification Service

A NestJS-based notification microservice that provides asynchronous notification processing with queue management.

## Features

- Asynchronous notification processing using Bull Queue and Redis
- Multiple notification types (email, text, in-app)
- JWT-based authentication for service-to-service communication
- MongoDB for data persistence
- Swagger API documentation
- Docker containerization

## API Endpoints

### Notifications

- `POST /notifications` - Send a notification
- `GET /notifications/user/:userId` - Get notifications for a user
- `GET /notifications/user/:userId/unread` - Get unread notifications
- `GET /notifications/user/:userId/unread/count` - Get unread notification count
- `PATCH /notifications/:id/read` - Mark notification as read
- `PATCH /notifications/:id/unread` - Mark notification as unread
- `DELETE /notifications/:id` - Delete notification

### Health Check

- `GET /notifications/health` - Health check endpoint

## Environment Variables

```
PORT=3004
MONGODB_URL=mongodb://admin:password123@localhost:27020/notification_db?authSource=admin
REDIS_HOST=localhost
REDIS_PORT=6380
JWT_SECRET=your-secret-key
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start Docker services:**

   ```bash
   docker-compose up -d
   ```

3. **Run the application:**

   ```bash
   npm run start:dev
   ```

4. **Access API documentation:**
   ```
   http://localhost:3004/api-docs
   ```

## Testing

```bash
npm run test
```

## Production Build

```bash
npm run build
npm run start:prod
```
