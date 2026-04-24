// CLI Migration Commands

const { sequelize } = require('./config/sequelize');
const MigrationRunner = require('./migrations/migrationRunner');

const runner = new MigrationRunner(sequelize);

const command = process.argv[2];

async function execute() {
  try {
    if (command === 'up' || command === 'migrate') {
      await runner.runUp();
      process.exit(0);
    } else if (command === 'down' || command === 'rollback') {
      await runner.runDown();
      process.exit(0);
    } else {
      console.log(`
Usage:
  npm run migrate       - Run all pending migrations
  npm run rollback     - Rollback all migrations
`);
      process.exit(0);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

execute();
