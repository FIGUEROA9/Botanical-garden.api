// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// Dominio: Jardín Botánico — Tree
// ============================================
import { Tree } from '../types';

export type CreateItemRepoDto = Omit<Tree, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

let items: Tree[] = [
  {
    id: 1,
    name: 'Roble',
    scientificName: 'Quercus humboldtii',
    family: 'Fagaceae',
    origin: 'Colombia',
    stock: 20,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Palma de cera',
    scientificName: 'Ceroxylon quindiuense',
    family: 'Arecaceae',
    origin: 'Colombia',
    stock: 15,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Guayacán',
    scientificName: 'Handroanthus chrysanthus',
    family: 'Bignoniaceae',
    origin: 'América tropical',
    stock: 10,
    createdAt: new Date(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Tree[]> {
  return items.map((item) => ({ ...item }));
}

export async function findById(id: number): Promise<Tree | undefined> {
  const item = items.find((i) => i.id === id);
  return item ? { ...item } : undefined;
}

export async function create(dto: CreateItemRepoDto): Promise<Tree> {
  const item: Tree = {
    id: nextId++,
    ...dto,
    createdAt: new Date(),
  };

  items.push(item);
  return { ...item };
}

export async function update(
  id: number,
  dto: UpdateItemRepoDto
): Promise<Tree | undefined> {
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return undefined;
  }

  items[index] = {
    ...items[index]!,
    ...dto,
  };

  return { ...items[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return false;
  }

  items.splice(index, 1);
  return true;
}