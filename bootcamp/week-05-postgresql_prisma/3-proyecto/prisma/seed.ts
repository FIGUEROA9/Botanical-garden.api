import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.family.createMany({
    data: [
      { name: 'Fagaceae' },
      { name: 'Arecaceae' },
      { name: 'Bignoniaceae' },
    ],
    skipDuplicates: true,
  });

  const families = await prisma.family.findMany();

  const fagaceae = families.find((f) => f.name === 'Fagaceae')!;
  const arecaceae = families.find((f) => f.name === 'Arecaceae')!;
  const bignoniaceae = families.find((f) => f.name === 'Bignoniaceae')!;

  await prisma.tree.createMany({
    data: [
      {
        name: 'Roble',
        scientificName: 'Quercus humboldtii',
        origin: 'Colombia',
        stock: 20,
        familyId: fagaceae.id,
      },
      {
        name: 'Palma de cera',
        scientificName: 'Ceroxylon quindiuense',
        origin: 'Colombia',
        stock: 15,
        familyId: arecaceae.id,
      },
      {
        name: 'Guayacán',
        scientificName: 'Handroanthus chrysanthus',
        origin: 'América tropical',
        stock: 10,
        familyId: bignoniaceae.id,
      },
    ],
    skipDuplicates: true,
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
