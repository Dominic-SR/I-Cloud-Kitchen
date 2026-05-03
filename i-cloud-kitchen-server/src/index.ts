import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { createDatabaseIfNotExists } from './config/database';
import apiRoutes from './routes/api';
import { apiLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { fileLogger } from './utils/fileLogger';
import './models/User';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiLogger);

// Routes
app.use('/api', apiRoutes);

// Global error handler
app.use(errorHandler);

// Database connection
createDatabaseIfNotExists()
  .then(() => sequelize.authenticate())
  .then(() => {
    fileLogger.success('Database connected successfully.');
    return sequelize.sync();
  })
  .then(() => {
    fileLogger.success('Database synced successfully.');
  })
  .catch((err) => {
    fileLogger.error('Unable to connect to the database:', err);
  });

// Start server
app.listen(PORT, () => {
  fileLogger.success(`Server is running on port ${PORT}`);
});