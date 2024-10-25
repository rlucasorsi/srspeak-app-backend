import express from 'express';
const router = express.Router();
import {userLogin} from '../controllers/authController.js';


// Rota para login do usuário
router.get('/', )
router.post('/', userLogin);


export default router;
