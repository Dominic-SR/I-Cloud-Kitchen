// Migration Runner
// Simple migration system for Sequelize

const fs = require('fs');
const path = require('path');
const Logger = require('../utils/logger');

const logger = new Logger('Migrations');

class MigrationRunner {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.migrationsPath = path.join(__dirname);
  }

  async getMigrations() {
    const files = fs.readdirSync(this.migrationsPath)
      .filter(f => f.endsWith('.js') && f !== 'migrationRunner.js')
      .sort();
    return files;
  }

  async runUp() {
    try {
      logger.info('Starting migrations...');
      const migrations = await this.getMigrations();

      for (const migration of migrations) {
        const migrationPath = path.join(this.migrationsPath, migration);
        const migrationModule = require(migrationPath);

        logger.info(`Running migration: ${migration}`);
        await migrationModule.up(this.sequelize.getQueryInterface(), this.sequelize.Sequelize);
        logger.success(`✓ Migration completed: ${migration}`);
      }

      logger.success('All migrations completed successfully');
    } catch (error) {
      logger.error('Migration failed', error);
      throw error;
    }
  }

  async runDown() {
    try {
      logger.info('Rolling back migrations...');
      const migrations = await this.getMigrations();

      for (const migration of migrations.reverse()) {
        const migrationPath = path.join(this.migrationsPath, migration);
        const migrationModule = require(migrationPath);

        logger.info(`Rolling back migration: ${migration}`);
        await migrationModule.down(this.sequelize.getQueryInterface(), this.sequelize.Sequelize);
        logger.success(`✓ Migration rolled back: ${migration}`);
      }

      logger.success('All migrations rolled back successfully');
    } catch (error) {
      logger.error('Rollback failed', error);
      throw error;
    }
  }
}

module.exports = MigrationRunner;
