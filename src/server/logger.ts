import { createLogger, transports, format } from 'winston';
const { combine, colorize, simple } = format;

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(colorize(), simple()),
      handleExceptions: true,
    }),
  ],
});

export default logger;
