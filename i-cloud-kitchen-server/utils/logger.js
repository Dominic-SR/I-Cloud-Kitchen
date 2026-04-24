// Logger Utility
// Centralized logging for development and production

const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  SUCCESS: 'SUCCESS'
};

const COLORS = {
  ERROR: '\x1b[31m',    // Red
  WARN: '\x1b[33m',     // Yellow
  INFO: '\x1b[36m',     // Cyan
  DEBUG: '\x1b[35m',    // Magenta
  SUCCESS: '\x1b[32m',  // Green
  RESET: '\x1b[0m'
};

class Logger {
  constructor(name = 'App') {
    this.name = name;
    this.logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatMessage(level, message, data = null) {
    const timestamp = this.getTimestamp();
    const color = COLORS[level] || '';
    const reset = COLORS.RESET;
    
    let output = `${color}[${timestamp}] [${level}] [${this.name}] ${message}${reset}`;
    if (data) {
      output += `\n${JSON.stringify(data, null, 2)}`;
    }
    
    return output;
  }

  writeToFile(level, message, data = null) {
    try {
      const timestamp = this.getTimestamp();
      let logEntry = `[${timestamp}] [${level}] [${this.name}] ${message}`;
      if (data) {
        logEntry += `\n${JSON.stringify(data, null, 2)}`;
      }
      logEntry += '\n' + '='.repeat(80) + '\n';
      
      fs.appendFileSync(this.logFile, logEntry);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  error(message, data = null) {
    const formatted = this.formatMessage(LOG_LEVELS.ERROR, message, data);
    console.error(formatted);
    this.writeToFile(LOG_LEVELS.ERROR, message, data);
  }

  warn(message, data = null) {
    const formatted = this.formatMessage(LOG_LEVELS.WARN, message, data);
    console.warn(formatted);
    this.writeToFile(LOG_LEVELS.WARN, message, data);
  }

  info(message, data = null) {
    const formatted = this.formatMessage(LOG_LEVELS.INFO, message, data);
    console.log(formatted);
    this.writeToFile(LOG_LEVELS.INFO, message, data);
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const formatted = this.formatMessage(LOG_LEVELS.DEBUG, message, data);
      console.log(formatted);
      this.writeToFile(LOG_LEVELS.DEBUG, message, data);
    }
  }

  success(message, data = null) {
    const formatted = this.formatMessage(LOG_LEVELS.SUCCESS, message, data);
    console.log(formatted);
    this.writeToFile(LOG_LEVELS.SUCCESS, message, data);
  }
}

module.exports = Logger;
