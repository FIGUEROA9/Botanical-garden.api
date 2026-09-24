import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    res.status(400).json({
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
