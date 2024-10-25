import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import ConflictError from "../errors/ConflictError.js";
import { findUserById } from "../utils/findUserById.js";
import ValidationError from "../errors/ValidationError.js";

export const getUsersService = async () => {
  return await prisma.user.findMany();
};

export const postUsersService = async (data) => {
  
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    throw new ConflictError("Email is already registered");
  }
 

  const findRole = await prisma.Role.findUnique({
    where: {
      id: data.roleId, 
    },
  });

  if (!findRole) {
    throw new ValidationError("Role not found");
  }

  const newUser = await prisma.user.create({
    data:{
      email: data.email,
      password_hash: data.password,
      name: data.name,
      status: data.status
    }
  });

await prisma.userAccessRole.create({
  data:{
    userId: newUser.id,
    roleId: findRole.id
  }
});

return newUser;

};

export const patchUsersService = async (data) => {
  const { id, name, email, status, roleId } = data;
  
  const user = await findUserById(id);

  const findEmail = await prisma.user.findMany({
    where: {
      email,
      id: { not: id },
    },
  });
  
  if (findEmail.length) { //email ja existe encontrado
    throw new ConflictError("Email already exists"); 
  }

  const roleResult = await prisma.Role.findUnique({
    where: {
      id: roleId, 
    },
  });

  if (!roleResult) {
    throw new ValidationError("Role not found");
  }

  return await prisma.user.update({
    data: { name, email, status, roleId },
    where: { id },
  });
};
