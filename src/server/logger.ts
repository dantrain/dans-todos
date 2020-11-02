import { createLogger, transports, format } from 'winston';
const { combine, colorize, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
      handleExceptions: true,
    }),
  ],
});

export default logger;
