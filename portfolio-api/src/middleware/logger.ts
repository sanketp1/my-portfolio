import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Only log essential request information, exclude sensitive data
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    // Exclude body and query to prevent logging sensitive data
  });
  next();
}; 