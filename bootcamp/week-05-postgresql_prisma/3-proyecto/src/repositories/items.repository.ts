// ============================================
// REPOSITORY — acceso a datos con Prisma
// Dominio: Jardín Botánico — Tree
// ============================================

import { prisma } from '../lib/prisma';
import { Tree } from '../types';

export type CreateItemRepoDto = Omit<Tree, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

export async function findAll(
  skip = 0,
  take = 10
): Promise<Tree[]> {
  return prisma.tree.findMany({
    skip,
    take,
    include: {
      family: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
}

export async function count(): Promise<number> {
  return prisma.tree.count();
}



export async function findById(id: number): Promise<Tree | undefined> {
  const item = await prisma.tree.findUnique({
    where: { id },
    include: {
      family: true,
    },
  });

  return item ?? undefined;
}

export async function create(dto: CreateItemRepoDto): Promise<Tree> {
  return prisma.tree.create({
    data: {
      name: dto.name,
      scientificName: dto.scientificName,
      origin: dto.origin,
      stock: dto.stock,
      family: {
        connect: {
          id: dto.familyId,
        },
      },
    },
    include: {
      family: true,
    },
  });
}

export async function update(
  id: number,
  dto: UpdateItemRepoDto
): Promise<Tree | undefined> {
  const exists = await prisma.tree.findUnique({
    where: { id },
  });

  if (!exists) {
    return undefined;
  }

  return prisma.tree.update({
    where: { id },
    data: {
      name: dto.name,
      scientificName: dto.scientificName,
      origin: dto.origin,
      stock: dto.stock,
      ...(dto.familyId !== undefined && {
        family: {
          connect: {
            id: dto.familyId,
          },
        },
      }),
    },
    include: {
      family: true,
    },
  });
}

export async function remove(id: number): Promise<boolean> {
  const result = await prisma.tree.deleteMany({
    where: { id },
  });

  return result.count > 0;
}
