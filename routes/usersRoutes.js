import express from 'express';
const router = express.Router();
import {getUsers,createUser,patchUsers} from '../controllers/userController.js';

// Rota para buscar todos os usuários
router.get('/', getUsers);

// Rota para criar um novo usuário
router.post('/', createUser);

router.put('/:id', patchUsers);

export default router;
