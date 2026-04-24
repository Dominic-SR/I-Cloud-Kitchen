// Validators Utility
// Helper functions for data validation

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const validateName = (name) => {
  return name && name.trim().length >= 2;
};

const validateUser = (userData) => {
  const errors = [];

  if (!validateName(userData.name)) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }

  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateUser
};
