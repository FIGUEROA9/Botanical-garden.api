// ============================================
// CONTROLLER: Family
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/family.service';
import { createFamilySchema, updateFamilySchema } from '../schemas/family.schema';
import { objectIdSchema } from '../schemas/tree.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createFamilySchema.parse(req.body);
    const item = await service.createFamily(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateFamilySchema.parse(req.body);
    const item = await service.updateFamily(id, dto);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteFamily(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
