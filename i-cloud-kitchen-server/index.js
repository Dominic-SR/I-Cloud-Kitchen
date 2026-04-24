require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const { sequelize, testConnection, syncDatabase } = require('./config/sequelize');

const logger = new Logger('Server');
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

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      logger.warn('Database connection failed, proceeding without database');
    }

    // Sync database models
    if (connected) {
      await syncDatabase();
    }

    // Start server
    app.listen(PORT, () => {
      logger.success(`Server running on http://localhost:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info('Available endpoints:');
      logger.info('  - GET  /');
      logger.info('  - GET  /api/health');
      logger.info('  - GET  /api/users');
      logger.info('  - GET  /api/users/:id');
      logger.info('  - POST /api/users');
      logger.info('  - PUT  /api/users/:id');
      logger.info('  - DELETE /api/users/:id');
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
