# BizMonsta - Business Management Platform

## Overview

BizMonsta is a comprehensive business management platform that provides CRM capabilities, bank cabinet management, analytics, and various business modules. The application features a React TypeScript frontend with a Node.js Express backend, built for managing client relationships, personal banking cabinets, and business operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: React Router for client-side navigation with protected routes
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: React Context API for authentication state
- **HTTP Client**: Axios with JSON-BigInt for API communication and large number handling
- **Theme Support**: Built-in dark/light theme support with next-themes
- **Form Handling**: React Hook Form with validation resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: JWT-based authentication with access and refresh tokens
- **Session Management**: Express sessions with MongoDB storage via connect-mongo
- **Security**: bcrypt for password hashing, CORS for cross-origin requests
- **API Structure**: RESTful endpoints organized by feature domains
- **Middleware**: Custom authentication middleware for protected routes

### Data Storage
- **Primary Database**: MongoDB with Mongoose ODM for data modeling
- **Connection Handling**: Automatic reconnection and graceful shutdown handling
- **Schema Design**: User model with email/password authentication and refresh token management

### Authentication & Authorization
- **Strategy**: JWT-based stateless authentication
- **Token Types**: Access tokens (1 day) and refresh tokens (30 days)
- **Password Security**: bcrypt hashing with salt generation
- **Session Storage**: MongoDB-backed sessions for additional security
- **Frontend Protection**: Route-level protection with authentication context

### Module System
The application is built around a modular architecture with distinct business modules:
- **CRM System**: Client management, call tracking, lead management
- **Bank Cabinets**: Personal banking interfaces with 30+ bank templates
- **Analytics**: Comprehensive reporting and data visualization
- **Office Management**: Employee, group, and position management
- **Payment Processing**: Subscription and payment history management

### API Design
- **Pattern**: RESTful API with consistent response structures
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Data Validation**: Input validation and sanitization
- **Response Format**: JSON with consistent success/error patterns
- **Proxy Configuration**: Development proxy setup for seamless client-server communication

## External Dependencies

### AI/ML Services
- **OpenAI API**: GPT model integration for intelligent features
- **Anthropic Claude**: Alternative AI provider for enhanced capabilities

### UI/UX Libraries
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Data visualization and charting library
- **Embla Carousel**: Touch-friendly carousel components

### Development Tools
- **ESLint**: Code linting with TypeScript and React-specific rules
- **Concurrently**: Parallel execution of client and server during development
- **Cross-env**: Cross-platform environment variable handling

### Monitoring & Logging
- **Pino**: High-performance JSON logging for Node.js
- **Chart.js**: Additional charting capabilities for analytics

### Utility Libraries
- **Moment.js**: Date and time manipulation
- **CSV Writer**: Data export functionality
- **Class Variance Authority**: Type-safe CSS class composition
- **CLSX & Tailwind Merge**: Conditional CSS class handling