export const swaggerOptions = {
  openapi: '3.0.0',
  info: {
    title: 'User Service API',
    version: '1.0.0',
    description: 'User service for user operations and authentication'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          address: {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              zipCode: { type: 'string' },
              country: { type: 'string' },
              isPreferred: { type: 'boolean' }
            }
          },
          mobile: {
            type: 'object',
            properties: {
              countryCode: { type: 'string' },
              number: { type: 'string' }
            }
          },
          dateOfBirth: { type: 'string', format: 'date' },
          addresses: {
            type: 'array',
            items: { $ref: '#/components/schemas/Address' }
          },
          role: { type: 'string', enum: ['user', 'admin'] },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          zipCode: { type: 'string' },
          country: { type: 'string' },
          isPreferred: { type: 'boolean' }
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { type: 'object' },
          message: { type: 'string' },
          error: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/users/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['firstName', 'lastName', 'email', 'address', 'mobile', 'dateOfBirth', 'password'],
                properties: {
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  address: { $ref: '#/components/schemas/Address' },
                  mobile: {
                    type: 'object',
                    properties: {
                      countryCode: { type: 'string' },
                      number: { type: 'string' }
                    }
                  },
                  dateOfBirth: { type: 'string', format: 'date' },
                  password: { type: 'string', minLength: 6 },
                  addresses: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Address' }
                  },
                  role: { type: 'string', enum: ['user', 'admin'] }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          },
          '400': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/forgot-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Request password reset',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Reset code sent',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/reset-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Reset password with code',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code', 'newPassword'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  code: { type: 'string' },
                  newPassword: { type: 'string', minLength: 6 }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Password reset successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/password': {
      put: {
        tags: ['User'],
        summary: 'Update password',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['currentPassword', 'newPassword'],
                properties: {
                  currentPassword: { type: 'string' },
                  newPassword: { type: 'string', minLength: 6 }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Password updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/profile': {
      get: {
        tags: ['User'],
        summary: 'Get user profile',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'Profile retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      },
      put: {
        tags: ['User'],
        summary: 'Update user profile',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  address: { $ref: '#/components/schemas/Address' },
                  mobile: {
                    type: 'object',
                    properties: {
                      countryCode: { type: 'string' },
                      number: { type: 'string' }
                    }
                  },
                  dateOfBirth: { type: 'string', format: 'date' },
                  addresses: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Address' }
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Profile updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' }
              }
            }
          }
        }
      }
    }
  }
};