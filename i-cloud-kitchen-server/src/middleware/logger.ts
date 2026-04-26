import { Request, Response, NextFunction } from 'express';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();
  const originalJson = res.json.bind(res);

  res.json = (body?: any) => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
      query: req.query,
      params: req.params,
      requestBody: req.body,
      responseBody: body,
    };

    if (res.statusCode >= 400) {
      console.error('API response error', logData);
    } else {
      console.log('API response', logData);
    }

    return originalJson(body);
  };

  next();
};
