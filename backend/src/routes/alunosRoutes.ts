import { Router } from 'express';
import alunosController from '../controllers/alunosController';

const router = Router();

router.post('/cadastro', alunosController.cadastrarAluno);

export default router;
