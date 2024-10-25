import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import { userLoginService } from "../services/loginService.js";
import CustomError from "../errors/CustomError.js";
import { sendZodError } from "../errors/SendZodError.js";
import { LoginSchema } from "../zod/authSchema.js";
import { z } from "zod";

async function userLogin(req, res, next) {
  try {
    LoginSchema.parse(req.body);
    const { email, password } = req.body;

    const login = await userLoginService({email, password});
    
    res.status(201).json(login);
  } catch (error) {
    if (error instanceof z.ZodError) {
        return sendZodError(error, res); // Chama a função para tratar o erro do Zod
      }
      next(error);
  }
}

export { userLogin };