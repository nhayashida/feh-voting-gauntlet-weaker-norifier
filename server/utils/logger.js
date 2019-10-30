const pino = require('pino');

const logger = pino({
  level: process.env.LOGGER_LEVEL || 'info',
  prettyPrint: process.env.LOGGER_PRETTY === 'true',
});

module.exports = logger;
