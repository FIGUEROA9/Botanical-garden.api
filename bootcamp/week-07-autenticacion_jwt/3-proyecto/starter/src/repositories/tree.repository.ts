import { TreeModel, ITree } from '../models/tree.model';
import { CreateTreeDto, UpdateTreeDto } from '../schemas/tree.schema';

export async function findAll(): Promise<ITree[]> {
  return TreeModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<ITree | null> {
  return TreeModel.findById(id);
}

export async function create(
  data: CreateTreeDto & { createdBy: string },
): Promise<ITree> {
  return TreeModel.create(data);
}

export async function updateById(
  id: string,
  data: UpdateTreeDto,
): Promise<ITree | null> {
  return TreeModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteById(id: string): Promise<boolean> {
  const deleted = await TreeModel.findByIdAndDelete(id);
  return deleted !== null;
}
