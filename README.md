# Time Management Backend

A Node.js/Express.js backend API built with TypeScript for time management applications.

## Features

- Express.js with TypeScript
- PostgreSQL database integration
- Security middleware (Helmet, CORS, Rate Limiting)
- Environment variable configuration
- Input validation with Joi
- ES Modules support

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=time_management
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── index.ts          # Main application entry point
├── routes/           # API routes
├── controllers/      # Route controllers
├── models/          # Database models
├── middleware/      # Custom middleware
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Dependencies

### Production

- express: Web framework
- pg: PostgreSQL client
- cors: Cross-origin resource sharing
- dotenv: Environment variable loader
- helmet: Security middleware
- express-rate-limit: Rate limiting middleware
- joi: Input validation

### Development

- typescript: TypeScript compiler
- ts-node: TypeScript execution engine
- nodemon: Development server with auto-restart
- @types/\*: TypeScript type definitions
