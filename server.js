import express from 'express';
const app = express();
import userRoutes from './routes/usersRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import resetPasswordRoutes from './routes/resetPasswordRoutes.js';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/users', userRoutes);

app.use('/login', authRoutes);

app.use('/reset-password', resetPasswordRoutes);

app.use(errorHandler);


// Inicialização do servidor
const PORT = process.env.PORT || 3000; // Você pode mudar a porta conforme necessário
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});