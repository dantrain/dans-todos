import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { id: "parklife" },
    update: {},
    create: {
      id: "parklife",
      todos: {
        create: [
          {
            text: "Put trousers on",
          },
          {
            text: "Have a cup of tea",
          },
          {
            text: "Think about leaving the house",
          },
        ],
      },
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
