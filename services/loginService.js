import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Se você estiver usando JWT para autenticação
import AuthenticationError from "../errors/AuthenticationError.js";

export const userLoginService = async (data) => {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: data.email,
        status: true
      },
    });
    
    if (!User) {
        throw new AuthenticationError("Authentication failed. Please check your credentials.");
      }
    
      const isPasswordValid = await bcrypt.compare(data.password, User.password_hash);

      if (!isPasswordValid) {
        throw new AuthenticationError("Authentication failed. Please check your credentials.");
      }

      const accesstoken = jwt.sign({ userId: User.id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.TOKEN_EXP,
     });

     const refreshtoken = jwt.sign({ userId: User.id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.REFRESH_TOKEN_EXP,
     });
     return { user: { id: User.id, email: User.email, name: User.name }, accesstoken, refreshtoken };
  } catch (error) {
    throw error;
  }
};
