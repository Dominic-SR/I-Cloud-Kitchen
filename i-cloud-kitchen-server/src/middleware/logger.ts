import { Request, Response, NextFunction } from 'express';
import { fileLogger } from '../utils/fileLogger';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();

  // Log incoming request
  fileLogger.api.request(req.method, req.originalUrl, req.body, req.params, req.query);

  // Intercept JSON responses
  const originalJson = res.json.bind(res);
  res.json = (body?: any) => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    if (res.statusCode >= 400) {
      fileLogger.api.error(req.method, req.originalUrl, res.statusCode, body);
    } else {
      fileLogger.api.response(req.method, req.originalUrl, res.statusCode, `${durationMs}ms`, body);
    }

    return originalJson(body);
  };

  // Intercept send responses for non-JSON
  const originalSend = res.send.bind(res);
  res.send = (body?: any) => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    if (res.statusCode >= 400) {
      fileLogger.api.error(req.method, req.originalUrl, res.statusCode, body);
    } else {
      fileLogger.api.response(req.method, req.originalUrl, res.statusCode, `${durationMs}ms`);
    }

    return originalSend(body);
  };

  next();
};
