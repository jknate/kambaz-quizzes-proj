# Kambaz Quizzes Project

This project contains both the frontend Next.js application and the backend Node.js server for the Kambaz Quizzes system.

## Project Structure

```
kambaz-quizzes-proj/
├── client/       # Next.js frontend application
└── server/       # Node.js backend server
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup

1. **Install dependencies for both client and server:**

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

2. **Start the development servers:**

   ```bash
   # Start the backend server (in server directory)
   npm run dev

   # In another terminal, start the frontend (in client directory)
   cd ../client
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Deployment

For production deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Development

- The frontend is built with Next.js, React, TypeScript, and Bootstrap
- The backend is a Node.js Express server
- Both applications support hot reloading during development
- Environment variables are used to configure API endpoints
