import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'A minimal order management and cart service API'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3003',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Order: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
            },
            orderItems: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        OrderItem: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            orderId: { type: 'integer' },
            productId: { type: 'integer' },
            price: { type: 'number', format: 'decimal' },
            quantity: { type: 'integer' },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'out_of_stock', 'cancelled']
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            productId: { type: 'integer' },
            price: { type: 'number', format: 'decimal' },
            quantity: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);