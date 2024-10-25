import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import { findUserByEmail } from "../utils/findUserByEmail.js";
import { generateSecurityCode } from "../utils/generateSecurityCode.js";
import AuthenticationError from "../errors/AuthenticationError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { hashPassword } from "../utils/HashPassword.js";
export const requestResetPassword = async (data) => {
  try {
    const user = await findUserByEmail(data);
    await prisma.PasswordReset.deleteMany({
      // Deleta códigos que ainda não expiraram do usuário e todos os códigos expirados
      where: {
        OR: [
          {
            userId: user.id,
            expiresAt: { gt: new Date() }, // Códigos que não expiraram
          },
          {
            expiresAt: { lt: new Date() }, // Códigos que já expiraram
          },
        ],
      },
    });

    // Gera um novo código de segurança
    const securityCode = generateSecurityCode();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Expira em 15 minutos
    // Armazena o novo código no banco de dados

    await sendEmail(user.email, securityCode);

    await prisma.PasswordReset.create({
      data: {
        userId: user.id,
        securityCode,
        expiresAt,
      },
    });

    return { success: true, message: "Reset code sent successfully." };
  } catch (error) {
    throw error;
  }
};

export const codeValidation = async (email, code) => {
  try {
    const user = await findUserByEmail(email);

    const validateCodeResult = await prisma.PasswordReset.findFirst({
      where: {
        userId: user.id,
        securityCode: code,
        expiresAt: { gt: new Date() }, // Verifica se o código não expirou
      },
    });

    if (!validateCodeResult) {
      throw new AuthenticationError("Invalid Code!");
    }

    await prisma.PasswordReset.update({
      where: { id: validateCodeResult.id },
      data: {
        verified: true, // Atualiza o campo 'verified'
      },
    });

    return { success: true, message: "Reset code validated successfully." };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (email, code, newPassword) => {
  try {
    const user = await findUserByEmail(email);

    const validateCodeResult = await prisma.PasswordReset.findFirst({
      where: {
        userId: user.id,
        securityCode: code,
        expiresAt: { gt: new Date() }, // Verifica se o código não expirou
        verified: true
      },
    });

    if (!validateCodeResult) {
      throw new AuthenticationError("Invalid, expired, or unverified code!");
    }

    const hashedPassword = await hashPassword(newPassword); // Gera o hash da nova senha

    // Atualiza a senha do usuário no banco de dados
    await prisma.user.update({
      where: { id: user.id },
      data: { password_hash: hashedPassword },
    });

    await prisma.PasswordReset.deleteMany({ //remove do banco de dados o codigo utilizado para atualizar senha
      where: { userId: user.id },
    });

    return { success: true, message: "Your password has been reset successfully."};
  } catch (error) {
    throw error;
  }
};