// Logger utility for consistent logging across the application
export enum LogLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[${new Date().toISOString()}] ℹ️ ${message}`, data || '');
  },

  success: (message: string, data?: any) => {
    console.log(`[${new Date().toISOString()}] ✅ ${message}`, data || '');
  },

  warning: (message: string, data?: any) => {
    console.warn(`[${new Date().toISOString()}] ⚠️ ${message}`, data || '');
  },

  error: (message: string, error?: any) => {
    console.error(`[${new Date().toISOString()}] ❌ ${message}`, error || '');
  },

  debug: (message: string, data?: any) => {
    if (process.env.DEBUG === 'true') {
      console.log(`[${new Date().toISOString()}] 🐛 ${message}`, data || '');
    }
  },

  api: {
    request: (method: string, url: string, body?: any) => {
      console.log(`[${new Date().toISOString()}] ➡️ API REQUEST: ${method} ${url}`);
      if (body && Object.keys(body).length > 0) {
        console.log(`   📦 Body:`, body);
      }
    },

    response: (method: string, url: string, status: number, durationMs: string, body?: any) => {
      const statusEmoji = status >= 400 ? '❌' : '✅';
      console.log(
        `[${new Date().toISOString()}] ${statusEmoji} API RESPONSE: ${method} ${url} - Status: ${status} - Duration: ${durationMs}`,
      );
      if (body && Object.keys(body).length > 0) {
        console.log(`   📤 Response:`, body);
      }
    },
  },
};
