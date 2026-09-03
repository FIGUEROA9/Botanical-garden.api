import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  // Familias
  const fagaceae = await prisma.family.upsert({
    where: { name: 'Fagaceae' },
    update: {},
    create: { name: 'Fagaceae' },
  });

  const arecaceae = await prisma.family.upsert({
    where: { name: 'Arecaceae' },
    update: {},
    create: { name: 'Arecaceae' },
  });

  const bignoniaceae = await prisma.family.upsert({
    where: { name: 'Bignoniaceae' },
    update: {},
    create: { name: 'Bignoniaceae' },
  });

  const meliaceae = await prisma.family.upsert({
    where: { name: 'Meliaceae' },
    update: {},
    create: { name: 'Meliaceae' },
  });

  const fabaceae = await prisma.family.upsert({
    where: { name: 'Fabaceae' },
    update: {},
    create: { name: 'Fabaceae' },
  });

  // Árboles
  await prisma.tree.upsert({
    where: { scientificName: 'Quercus humboldtii' },
    update: {},
    create: {
      name: 'Roble',
      scientificName: 'Quercus humboldtii',
      origin: 'Colombia',
      stock: 20,
      familyId: fagaceae.id,
    },
  });

  await prisma.tree.upsert({
    where: { scientificName: 'Ceroxylon quindiuense' },
    update: {},
    create: {
      name: 'Palma de cera',
      scientificName: 'Ceroxylon quindiuense',
      origin: 'Colombia',
      stock: 15,
      familyId: arecaceae.id,
    },
  });

  await prisma.tree.upsert({
    where: { scientificName: 'Handroanthus chrysanthus' },
    update: {},
    create: {
      name: 'Guayacán',
      scientificName: 'Handroanthus chrysanthus',
      origin: 'América tropical',
      stock: 10,
      familyId: bignoniaceae.id,
    },
  });

  await prisma.tree.upsert({
    where: { scientificName: 'Cedrela odorata' },
    update: {},
    create: {
      name: 'Cedro',
      scientificName: 'Cedrela odorata',
      origin: 'América tropical',
      stock: 12,
      familyId: meliaceae.id,
    },
  });

  await prisma.tree.upsert({
    where: { scientificName: 'Samanea saman' },
    update: {},
    create: {
      name: 'Samán',
      scientificName: 'Samanea saman',
      origin: 'América tropical',
      stock: 8,
      familyId: fabaceae.id,
    },
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
