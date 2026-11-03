// ============================================
// SERVICE — Lógica de negocio
// ============================================
// Reglas de esta capa:
// - CERO imports de Express (sin Request, Response, NextFunction)
// - Llama al repository para acceder a datos
// - Contiene la paginación y validaciones de dominio
// - Retorna undefined cuando no encuentra; el controller maneja el 404
//
// TODO: Renombra "Item" por el modelo de tu dominio en todo el archivo

import {
  CreatePlantDto,
  UpdatePlantDto,
  Plant,
  PaginatedResponse,
  PaginationParams,
} from '../types';

import * as repo from '../repositories/items.repository';

export async function findAll(
  params: PaginationParams
): Promise<PaginatedResponse<Plant>> {
  // TODO: Obtener todos del repo, aplicar paginación y retornar PaginatedResponse
  const { page, limit } = params;

  const all = await repo.findAll();

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

export async function findById(
  id: number
): Promise<Plant | undefined> {
  // TODO: Delegar al repo
  return repo.findById(id);
}

export async function create(
  dto: CreatePlantDto
): Promise<Plant> {
  // TODO: Validaciones de negocio específicas de tu dominio (si aplica)
  // Luego delegar la creación al repo
  return repo.create(dto);
}

export async function update(
  id: number,
  dto: UpdatePlantDto
): Promise<Plant | undefined> {
  // TODO: Verificar existencia con findById, luego actualizar
  const exists = await repo.findById(id);

  if (!exists) {
    return undefined;
  }

  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  // TODO: Verificar existencia, luego eliminar
  const exists = await repo.findById(id);

  if (!exists) {
    return false;
  }

  return repo.remove(id);
}