// middlewares/errorHandler.js
import CustomError from '../errors/CustomError.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    // Se for um erro customizado, retorna o status e a mensagem apropriada
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Para outros erros inesperados, retorna um erro genérico
  console.error(err); // Log do erro para depuração
  return res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
