require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to I-Cloud-Kitchen Server',
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    documentation: 'See available endpoints at /api'
  });
});

// API Routes (MVC pattern)
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Available endpoints:`);
  console.log(`  - GET  /`);
  console.log(`  - GET  /api/health`);
  console.log(`  - GET  /api/users`);
  console.log(`  - POST /api/users`);
});

module.exports = app;
