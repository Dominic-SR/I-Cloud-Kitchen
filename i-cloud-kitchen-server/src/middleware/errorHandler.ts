import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error', {
    method: req.method,
    url: req.originalUrl,
    message: err instanceof Error ? err.message : err,
    stack: err instanceof Error ? err.stack : undefined,
    params: req.params,
    query: req.query,
    body: req.body,
  });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: 'Internal server error' });
};
