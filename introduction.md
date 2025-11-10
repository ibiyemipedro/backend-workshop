# 🚀 Backend Development Workshop with Node.js

Welcome to the comprehensive hands-on workshop for backend development using Node.js, Express.js, and NestJS with TypeScript.

## 📋 Workshop Overview

This workshop is designed for developers who want to master modern backend development through practical, hands-on exercises. We'll build real microservices and learn industry best practices.

```
┌─────────────────────────────────────────────────────────┐
│                 WORKSHOP LEARNING PATH                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SECTION 1: Foundation & Framework Mastery             │
│  ├── Backend Development Basics                        │
│  ├── Express.js Development                            │
│  ├── NestJS Development                                │
│  └── Database Integration                              │
│                                                         │
│  SECTION 2: Microservices Architecture                 │
│  ├── Service Communication                             │
│  ├── External API Integration                          │
│  └── Asynchronous Messaging                           │
│                                                         │
│  SECTION 3: Advanced Database Operations               │
│  ├── Multi-Database Architecture                       │
│  ├── Query Optimization                                │
│  └── Performance Monitoring                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Learning Objectives

By the end of this workshop, you will be able to:

- ✅ Build production-ready APIs with Express.js and NestJS
- ✅ Implement clean architecture patterns
- ✅ Work with both MongoDB and PostgreSQL databases
- ✅ Design and implement microservices
- ✅ Handle authentication, validation, and error management
- ✅ Optimize database queries and operations
- ✅ Implement asynchronous communication between services

## 🛠️ Technology Stack

### Core Technologies

- **Language**: TypeScript
- **Frameworks**: Express.js, NestJS
- **Databases**: MongoDB, PostgreSQL
- **ORMs**: Mongoose, TypeORM
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI

### Tools & Infrastructure

- **Containerization**: Docker
- **Message Queue**: Apache Kafka
- **External Services**: AWS SES
- **Database Management**: pgAdmin, MongoDB Compass

## 🏗️ Workshop Structure

### Section 1: Framework Foundations (6-8 hours)

```
Backend Basics → Express.js → NestJS → Database Integration
```

**Key Topics:**

- 📚 Backend development fundamentals
- 🌐 API architecture and data flow
- ⚡ Express.js application development
- 🏛️ NestJS enterprise patterns
- 💾 MongoDB and PostgreSQL integration
- 🕒 Scheduled tasks with cron jobs

**Deliverables:**

- Complete Express.js user management API
- Full-featured NestJS product service
- Database models and operations

---

### Section 2: Microservices Architecture (4-6 hours)

```
Service Design → Inter-Service Communication → External APIs → Async Messaging
```

**Key Topics:**

- 🔧 Microservice architecture patterns
- 🔄 Service-to-service communication
- 📧 External API integration (AWS SES)
- 📨 Asynchronous messaging with Kafka

**Microservices Built:**

1. **User Service** (Express.js + MongoDB)
2. **Product Service** (NestJS + PostgreSQL)
3. **Order Service** (Express.js + PostgreSQL)
4. **Notification Service** (NestJS + MongoDB + Kafka)
5. **Analytics Service** (Express.js + Multi-DB)

---

### Section 3: Database Mastery (4-6 hours)

```
Relationships → Query Logging → Migrations → Advanced Operations
```

**Key Topics:**

- 🔗 Database relationships (SQL & NoSQL)
- 🔍 ORM query analysis and optimization
- 📊 Database migrations and seeding
- 🚀 Advanced PostgreSQL and MongoDB operations
- 📈 Performance monitoring and tuning

## 🚦 Prerequisites

### Required Software

- ✅ **Node.js** (v16 or higher)
- ✅ **Docker** (with Docker Compose)
- ✅ **Git** (for repository cloning)

### Knowledge Prerequisites

- Basic JavaScript/TypeScript knowledge
- Understanding of REST APIs
- Basic familiarity with databases
- Command line experience

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <workshop-repository-url>
cd backend-workshop
```

### 2. Verify Prerequisites

```bash
node --version    # Should be v20+
docker --version  # Should be installed
```

### 3. Start with Section 1

```bash
cd section-1
# Follow the detailed guides in section-1/docs/
```

## 📁 Repository Structure

```
backend-workshop/
├── introduction.md           # This file
├── section-1/               # Framework foundations
│   ├── docs/               # Detailed workshop materials
│   ├── express-api/        # Express.js exercises
│   └── nestjs-api/         # NestJS exercises
├── section-2/               # Microservices
│   ├── docs/               # Detailed workshop materials
│   ├── user-service/       # Service I - Users
│   ├── product-service/    # Service II - Products
│   ├── order-service/      # Service III - Orders
│   └── notification-service/ # Service IV - Notifications
└── section-3/               # Database operations
    ├── docs/               # Detailed workshop materials
    └── analytics-service/  # Service V - Multi-database
```

## 🎓 Workshop Format

### Learning Approach

- **Practical Informational**: Theory with visual diagrams and flow charts
- **Exercise Focused**: Hands-on coding with step-by-step implementation

### Exercise Pattern

```
Theory → Practice → Build → Test → Enhance
```

Each section builds upon the previous, creating a complete e-commerce microservices ecosystem.

## 📊 Workshop Outcome

### Final Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  E-COMMERCE ECOSYSTEM                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend App                                           │
│      │                                                  │
│  ┌───▼────┐  ┌──────────┐  ┌──────────┐               │
│  │ User   │  │ Product  │  │ Order    │               │
│  │Service │  │ Service  │  │ Service  │               │
│  │(Express│  │(NestJS)  │  │(Express) │               │
│  │MongoDB)│  │Postgres) │  │Postgres) │               │
│  └────────┘  └──────────┘  └────┬─────┘               │
│      │            │             │                      │
│      └────────────┼─────────────┘                      │
│                   │                                     │
│  ┌────────────────▼─────────┐  ┌──────────────────┐    │
│  │   Notification Service   │  │ Analytics Service│    │
│  │   (NestJS + MongoDB)     │  │ (Express + Both) │    │
│  │      + Kafka Queue       │  │                  │    │
│  └──────────────────────────┘  └──────────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Skills Gained

- ✅ **API Development**: RESTful services with proper patterns
- ✅ **Database Design**: Relational and document databases
- ✅ **Authentication**: JWT-based security
- ✅ **Architecture**: Clean, scalable code organization
- ✅ **DevOps**: Docker containerization
- ✅ **Testing**: Unit tests and API testing
- ✅ **Documentation**: Swagger API documentation
- ✅ **Performance**: Query optimization and monitoring

## 📚 Getting Help

### During the Workshop

- 🙋‍♂️ Ask questions anytime
- 👥 Pair programming encouraged
- 🔧 Troubleshooting support available

### Resources

- Each section has detailed documentation
- Code examples and templates provided
- Links to official documentation included

---

## 🎯 Ready to Start?

Navigate to [`section-1/docs/1.0.md`](section-1/docs/1.0.md) to begin your backend development journey!

### Quick Navigation

- 📖 [Section 1: Framework Foundations](section-1/docs/)
- 🏗️ [Section 2: Microservices Architecture](section-2/docs/)
- 🗃️ [Section 3: Database Operations](section-3/docs/)

Happy coding! 🚀
