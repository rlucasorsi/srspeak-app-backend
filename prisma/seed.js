import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Teacher' },
      { id: 3, name: 'User' },
      { id: 4, name: 'HelpDesk'},
      // Adicione mais roles conforme necessário
    ],
  });

  console.log('Roles have been populated');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
