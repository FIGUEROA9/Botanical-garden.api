// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store (array, DB, archivo)
// - Todos los métodos deben ser async Promise<T>
// - Retornar copias defensivas (no la referencia interna)
// - Si no encuentra un elemento, retornar undefined
//
// TODO: Renombra "Item" por el modelo de tu dominio
// TODO: Agrega datos iniciales coherentes con tu dominio

import { Plant, CreatePlantDto, UpdatePlantDto } from '../types';

// TODO: Inicializa el store con 3-5 elementos de tu dominio
const store: Plant[] = [
  {
    id: 1,
    nombreComun: 'Orquídea Cattleya',
    nombreCientifico: 'Cattleya trianae',
    familia: 'Orchidaceae',
    tipo: 'Ornamental',
    ubicacion: 'Invernadero Tropical',
    estado: 'saludable',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    nombreComun: 'Palma de Cera',
    nombreCientifico: 'Ceroxylon quindiuense',
    familia: 'Arecaceae',
    tipo: 'Árbol',
    ubicacion: 'Zona Andina',
    estado: 'saludable',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    nombreComun: 'Frailejón',
    nombreCientifico: 'Espeletia grandiflora',
    familia: 'Asteraceae',
    tipo: 'Planta de páramo',
    ubicacion: 'Ecosistema de Páramo',
    estado: 'en_observacion',
    createdAt: new Date().toISOString(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Plant[]> {
  // TODO: Retornar copia defensiva del array completo
  return store.map((plant) => ({ ...plant }));
}

export async function findById(id: number): Promise<Plant | undefined> {
  // TODO: Buscar por id y retornar el elemento o undefined
  const plant = store.find((plant) => plant.id === id);

  return plant ? { ...plant } : undefined;
}

export async function create(dto: CreatePlantDto): Promise<Plant> {
  // TODO: Crear el item con id auto-incremental y createdAt
  const plant: Plant = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };

  store.push(plant);

  return { ...plant };
}

export async function update(
  id: number,
  dto: UpdatePlantDto
): Promise<Plant | undefined> {
  // TODO: Encontrar el index, fusionar cambios, retornar copia
  const index = store.findIndex((plant) => plant.id === id);

  if (index === -1) {
    return undefined;
  }

  store[index] = {
    ...store[index]!,
    ...dto,
  };

  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  // TODO: Eliminar y retornar true; si no existe, retornar false
  const index = store.findIndex((plant) => plant.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);

  return true;
}