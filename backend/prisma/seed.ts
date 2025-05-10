import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.vehicle.createMany({
    data: [
      { wheels: 4, type: 'hatchback', model: 'Maruti Alto' },
      { wheels: 4, type: 'suv', model: 'Hyundai Creta' },
      { wheels: 4, type: 'sedan', model: 'Honda City' },
      { wheels: 2, type: 'cruiser', model: 'Royal Enfield' },
      { wheels: 2, type: 'sports', model: 'Yamaha R15' },
    ]
  })
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
