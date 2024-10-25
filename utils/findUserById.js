import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import CustomError from "../errors/CustomError.js";

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  return user;
};

export {findUserById};