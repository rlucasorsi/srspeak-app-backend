import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import { sendZodError } from "../errors/SendZodError.js";
import { requestResetPasswordSchema, codeValidationSchema, resetPasswordSchema } from "../zod/resetPasswordSchema.js";
import { z } from "zod";
import {requestResetPassword, codeValidation, resetPasswordService} from "../services/resetPasswordService.js";

async function postRequestResetPassword (req, res, next) {
  try {
    requestResetPasswordSchema.parse(req.body);
    const { email } = req.body;
    const resetpasswordResult = await requestResetPassword(email);
  
    res.status(200).json(resetpasswordResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendZodError(error, res); // Chama a função para tratar o erro do Zod
    }
      next(error);
  }
}

async function postCodeValidation (req, res, next) {
  try {
    codeValidationSchema.parse(req.body);
    const { email, code } = req.body;
    const codeValidationResult = await codeValidation(email, code);
  
    res.status(200).json(codeValidationResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendZodError(error, res); // Chama a função para tratar o erro do Zod
    }
      next(error);
  }
}

async function postResetPassword (req, res, next) {
  try {
    resetPasswordSchema.parse(req.body);
    const { email, code, newPassword } = req.body;
    const resetPasswordResult = await resetPasswordService(email, code, newPassword);
  
    res.status(200).json(resetPasswordResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendZodError(error, res); // Chama a função para tratar o erro do Zod
    }
      next(error);
  }
}

export { postRequestResetPassword, postCodeValidation, postResetPassword };