// Check database script
const { sequelize } = require('./config/sequelize');

async function checkDatabase() {
  try {
    // Check if tables exist
    const [results] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tables in database:', results.map(r => r.name));

    // Check users table structure
    if (results.some(r => r.name === 'users')) {
      const [columns] = await sequelize.query("PRAGMA table_info(users)");
      console.log('Users table columns:');
      columns.forEach(col => {
        console.log(`  - ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
      });
    } else {
      console.log('Users table does not exist!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error checking database:', error);
    process.exit(1);
  }
}

checkDatabase();