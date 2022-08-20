import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userid = process.env.DEV_USER_ID || "parklife";

const main = async () => {
  await prisma.user.upsert({
    where: { id: userid },
    update: {},
    create: {
      id: userid,
      todos: {
        create: [
          {
            text: "Put trousers on",
            completed: true,
          },
          {
            text: "Have a cup of tea",
            completed: false,
          },
          {
            text: "Think about leaving the house",
            completed: false,
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
