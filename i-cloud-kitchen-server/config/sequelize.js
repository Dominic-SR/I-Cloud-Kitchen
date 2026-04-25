// Sequelize Configuration
// Database connection and initialization

const { Sequelize } = require('sequelize');
const path = require('path');
const Logger = require('../utils/logger');

const logger = new Logger('Database');

// Use SQLite for development if MySQL is not available
const useSQLite = process.env.DB_DIALECT === 'sqlite' || !process.env.DB_HOST;

const sequelize = useSQLite
  ? new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database.sqlite'),
      logging: (msg) => logger.debug(msg)
    })
  : new Sequelize(
      process.env.DB_NAME || 'i_cloud_kitchen',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: (msg) => logger.debug(msg),
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.success('Database connection successful');
    return true;
  } catch (error) {
    logger.error('Database connection failed', error);
    return false;
  }
};

// Sync models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    logger.success('Database models synced successfully');
  } catch (error) {
    logger.error('Error syncing database models', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
};
