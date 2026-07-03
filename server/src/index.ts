import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact';

// Load environment variables
dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// -----------------------------------------------------------
// Middlewares Setup
// -----------------------------------------------------------

// Enable CORS with customizable client origin bounds
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// Log incoming requests in dev mode
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// -----------------------------------------------------------
// API Routes
// -----------------------------------------------------------

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Contact route prefixing
app.use('/api', contactRouter);

// Graceful fallback for unmapped routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// -----------------------------------------------------------
// Start Listening
// -----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  Portfolio Server running on port ${PORT}`);
  console.log(`  CORS enabled for origin: ${FRONTEND_URL}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
