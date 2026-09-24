import { Request, Response, NextFunction } from 'express';
import * as treeService from '../services/tree.service';
import { createTreeSchema, updateTreeSchema } from '../schemas/tree.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const trees = await treeService.getAll();
    res.status(200).json(trees);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tree = await treeService.getById(req.params.id);
    res.status(200).json(tree);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createTreeSchema.parse(req.body);
    const userId = req.user!.sub;
    const tree = await treeService.create(dto, userId);
    res.status(201).json(tree);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateTreeSchema.parse(req.body);
    const tree = await treeService.update(req.params.id, dto);
    res.status(200).json(tree);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await treeService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
