import { ITree } from '../models/tree.model';
import * as treeRepository from '../repositories/tree.repository';
import { CreateTreeDto, UpdateTreeDto } from '../schemas/tree.schema';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<ITree[]> {
  return treeRepository.findAll();
}

export async function getById(id: string): Promise<ITree> {
  const tree = await treeRepository.findById(id);
  if (!tree) throw new AppError(404, `Árbol ${id} no encontrado`);
  return tree;
}

export async function create(dto: CreateTreeDto, userId: string): Promise<ITree> {
  return treeRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateTreeDto): Promise<ITree> {
  await getById(id);
  const updated = await treeRepository.updateById(id, dto);
  return updated!;
}

export async function remove(id: string): Promise<void> {
  const deleted = await treeRepository.deleteById(id);
  if (!deleted) throw new AppError(404, `Árbol ${id} no encontrado`);
}
