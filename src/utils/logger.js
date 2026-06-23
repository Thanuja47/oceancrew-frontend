/**
 * Frontend Logger Utility
 * Provides structured logging with timestamps and log levels.
 * This ensures consistency across the Vercel app.
 */

const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message, meta = {}) => {
    console.log(`[${getTimestamp()}] [INFO] ${message}`, Object.keys(meta).length ? meta : '');
  },
  warn: (message, meta = {}) => {
    console.warn(`[${getTimestamp()}] [WARN] ${message}`, Object.keys(meta).length ? meta : '');
  },
  error: (message, error = null) => {
    console.error(`[${getTimestamp()}] [ERROR] ${message}`);
    if (error) {
      console.error(error);
    }
  },
  debug: (message, meta = {}) => {
    // Only show debug in local development
    if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
      console.log(`[${getTimestamp()}] [DEBUG] ${message}`, Object.keys(meta).length ? meta : '');
    }
  }
};

export default logger;
