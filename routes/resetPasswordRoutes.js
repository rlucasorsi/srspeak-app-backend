import express from 'express';
const router = express.Router();
import {postCodeValidation, postRequestResetPassword, postResetPassword} from '../controllers/resetPasswordController.js';


// Rota para login do usuário
router.post('/request', postRequestResetPassword);

router.post('/code-validation',postCodeValidation);

router.post('/reset-password',postResetPassword);

export default router;
