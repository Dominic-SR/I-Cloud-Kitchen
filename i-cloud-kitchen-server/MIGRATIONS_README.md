# Sequelize Migrations Setup

## Overview
This project uses Sequelize CLI for database migrations. Migrations allow you to version control your database schema and easily roll back changes.

## Project Structure
```
src/
  database/
    config/
      config.json          - Database configuration for different environments
    migrations/             - Migration files
    seeders/               - Seeder files for sample data
  models/                  - Sequelize models
```

## Database Tables Created

### 1. Users
- Stores user account information
- Fields: id, name, email, password, timestamps

### 2. Categories
- Restaurant menu categories (e.g., Appetizers, Main Course, Desserts)
- Fields: id, name, description, image, timestamps

### 3. Menu Items
- Individual dishes/products in the menu
- Fields: id, name, description, price, image, categoryId, isAvailable, timestamps
- Foreign Key: categoryId (references categories)

### 4. Orders
- Customer orders
- Fields: id, userId, totalPrice, status, deliveryAddress, notes, timestamps
- Foreign Key: userId (references users)
- Status values: pending, preparing, ready, completed, cancelled

### 5. Order Items
- Individual items in an order
- Fields: id, orderId, menuItemId, quantity, price, specialRequests, timestamps
- Foreign Keys: orderId (references orders), menuItemId (references menu_items)

## Available Commands

### Run Migrations
```bash
npm run migrate
```
Runs all pending migrations and updates the database schema.

### Undo Last Migration
```bash
npm run migrate:undo
```
Rolls back the most recent migration.

### Undo All Migrations
```bash
npm run migrate:undo:all
```
Rolls back all migrations. Use with caution!

### Run Seeders
```bash
npm run seed
```
Runs all seeders to populate sample data into the database.

### Undo All Seeders
```bash
npm run seed:undo
```
Removes all seeded data from the database.

## Creating New Migrations

To create a new migration:

```bash
npx sequelize-cli migration:generate --name add-new-table
```

This creates a new migration file in `src/database/migrations/` with up() and down() methods.

Example migration file:
```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add your changes here
    await queryInterface.createTable('table_name', {
      // column definitions
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert changes here
    await queryInterface.dropTable('table_name');
  },
};
```

## Creating Seeders

To create a new seeder:

```bash
npx sequelize-cli seed:generate --name seed-users
```

This creates a new seeder file in `src/database/seeders/`.

Example seeder file:
```javascript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample data
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove sample data
    await queryInterface.bulkDelete('users', null, {});
  },
};
```

## Environment Configuration

Database configuration is read from `.env` file and set in `src/database/config/config.json`:

- **development**: Local development database
- **test**: Testing database
- **production**: Production database

## Migration History

All executed migrations are tracked in the `SequelizeMeta` table in your database. This table is automatically created when you first run migrations.

## Tips

1. Always write both `up()` and `down()` methods for migrations
2. Test migrations locally before pushing to production
3. Use meaningful migration names (e.g., `20260426000001-create-users-table`)
4. Never modify migration files after they've been executed in production
5. Keep migrations focused on a single schema change
