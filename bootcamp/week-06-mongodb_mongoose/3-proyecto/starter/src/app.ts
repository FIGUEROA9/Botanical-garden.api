// ============================================
// app.ts — Configuración de Express
// Dominio: Jardín Botánico
// ============================================

import express from 'express';
import familyRouter from './routes/family.routes';
import treeRouter from './routes/tree.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/families', familyRouter);
app.use('/api/v1/trees', treeRouter);

app.use(notFound);
app.use(errorHandler);
