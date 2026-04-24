// User Model
// Defines the User data structure

class User {
  constructor(id, name, email, password, createdAt = new Date()) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  // TODO: Add database query methods
  // Example:
  // static async findById(id) { }
  // static async findAll() { }
  // async save() { }
  // async update() { }
  // async delete() { }
}

module.exports = User;
