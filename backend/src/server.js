import { config } from 'dotenv';
config();

import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB, disconnectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import posts_routes from './routes/posts_routes.js';
import commentsRoutes from './routes/comments.js';
import profileRoute from './routes/profileRoute.js';
import followRoutes from './routes/followRoutes.js';
import lostPassRoutes from './routes/lostPass.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/posts', posts_routes);
app.use('/auth', authRoutes);
app.use('/auth', lostPassRoutes);
app.use('/comments', commentsRoutes);
app.use('/users', followRoutes);
app.use('/profile', profileRoute);

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Wildcard route to handle client-side routing using regex
app.get(/.*/, (req, res, next) => {
  // Don't catch API routes (those starting with /auth, /posts, /comments, /users, /profile)
  if (
    req.path.startsWith('/auth') || 
    req.path.startsWith('/posts') || 
    req.path.startsWith('/comments') || 
    req.path.startsWith('/users') || 
    req.path.startsWith('/profile')
  ) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await disconnectDB();
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    await disconnectDB();
    console.log('Server closed, exiting process.');
    process.exit(0);
  });
});
