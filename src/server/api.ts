import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const apiRouter = express.Router();

apiRouter.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: { id },
    select: { todos: { select: { text: true, completed: true } } },
  });

  res.json(user?.todos);
});

export default apiRouter;
