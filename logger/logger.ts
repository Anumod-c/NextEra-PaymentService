import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json() // or format.simple() for plain text logs
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'paymentService.log' }) // Log to a file
  ],
});

export default logger;
