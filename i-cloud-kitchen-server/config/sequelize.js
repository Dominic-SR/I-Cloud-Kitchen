// Sequelize Configuration
// Database connection and initialization

require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');
const Logger = require('../utils/logger');

const logger = new Logger('Database');
const dialect = process.env.DB_DIALECT || 'sqlite';
const useSQLite = dialect === 'sqlite' || !process.env.DB_HOST;
const mysqlDatabase = process.env.DB_NAME || 'i_cloud_kitchen';
const mysqlUser = process.env.DB_USER || 'root';
const mysqlPassword = process.env.DB_PASSWORD || '';
const mysqlHost = process.env.DB_HOST || 'localhost';
const mysqlPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

const sequelize = useSQLite
  ? new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../database.sqlite'),
      logging: (msg) => logger.debug(msg)
    })
  : new Sequelize(
      mysqlDatabase,
      mysqlUser,
      mysqlPassword,
      {
        host: mysqlHost,
        port: mysqlPort,
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

const createDatabaseIfNotExists = async () => {
  if (useSQLite) {
    logger.info('SQLite mode: no separate database creation needed.');
    return;
  }

  const adminSequelize = new Sequelize('', mysqlUser, mysqlPassword, {
    host: mysqlHost,
    port: mysqlPort,
    dialect: 'mysql',
    logging: false
  });

  try {
    await adminSequelize.authenticate();
    logger.success('Connected to MySQL server');
    await adminSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlDatabase}\`;`);
    logger.success(`Database ensured: ${mysqlDatabase}`);
  } catch (error) {
    logger.error('Unable to create or verify MySQL database', error);
    throw error;
  } finally {
    await adminSequelize.close();
  }
};

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
  createDatabaseIfNotExists,
  testConnection,
  syncDatabase
};
