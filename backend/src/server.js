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

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

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
