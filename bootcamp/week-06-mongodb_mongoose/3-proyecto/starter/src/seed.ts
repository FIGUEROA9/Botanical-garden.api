// ============================================
// SEED — Insertar datos de prueba
// Dominio: Jardín Botánico
// ============================================

import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Family } from './models/family.model';
import { Tree } from './models/tree.model';

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones (orden inverso: principal primero, luego secundaria)
  await Tree.deleteMany({});
  await Family.deleteMany({});
  console.log('Collections cleared');

  // Paso A — Familias
  const [fagaceae, arecaceae, bignoniaceae, meliaceae, fabaceae] = await Family.insertMany([
    { name: 'Fagaceae' },
    { name: 'Arecaceae' },
    { name: 'Bignoniaceae' },
    { name: 'Meliaceae' },
    { name: 'Fabaceae' },
  ]);
  console.log('Families inserted');

  // Paso B — Árboles, referenciando el _id de cada familia
  await Tree.insertMany([
    {
      name: 'Roble',
      scientificName: 'Quercus humboldtii',
      origin: 'Colombia',
      stock: 20,
      family: fagaceae._id,
    },
    {
      name: 'Palma de cera',
      scientificName: 'Ceroxylon quindiuense',
      origin: 'Colombia',
      stock: 15,
      family: arecaceae._id,
    },
    {
      name: 'Guayacán',
      scientificName: 'Handroanthus chrysanthus',
      origin: 'América tropical',
      stock: 10,
      family: bignoniaceae._id,
    },
    {
      name: 'Cedro',
      scientificName: 'Cedrela odorata',
      origin: 'América tropical',
      stock: 12,
      family: meliaceae._id,
    },
    {
      name: 'Samán',
      scientificName: 'Samanea saman',
      origin: 'América tropical',
      stock: 8,
      family: fabaceae._id,
    },
  ]);
  console.log('Trees inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
