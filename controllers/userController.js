import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import { getUsersService, postUsersService, patchUsersService } from "../services/userService.js";
import { sendZodError } from "../errors/SendZodError.js";
import { CreateUserSchema, UpdateUserSchema } from "../zod/userSchema.js";
import { hashPassword } from '../utils/HashPassword.js';
import { z } from 'zod';

// Função para listar todos os usuários
async function getUsers(req, res, next) {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

// Função para criar um novo usuário
const createUser = async (req, res, next) => {
  //Criação do usuário
  try {
    CreateUserSchema.parse(req.body);
    const { name, email, password, status, roleId } = req.body;

    const hashedPassword = await hashPassword(password); // Hash da senha

    const newUser = await postUsersService({ name, email, password: hashedPassword, status, roleId });
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendZodError(error, res); // Chama a função para tratar o erro do Zod
    }
    next(error);
  }
};


async function patchUsers(req, res, next) {
  try {
    const users = await patchUsersService({id:Number(req.params.id),...UpdateUserSchema.parse(req.body)});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}


export { getUsers, createUser, patchUsers };

