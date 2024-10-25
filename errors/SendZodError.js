// SendZodError.js
import { ZodError } from 'zod';

// Função para enviar erros de validação do Zod
export const sendZodError = (error, res) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors: error.errors,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
};
