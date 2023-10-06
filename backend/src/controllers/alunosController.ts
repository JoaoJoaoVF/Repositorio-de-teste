import { Request, Response } from 'express';
import alunosService from '../services/alunosService';

const alunosController = {

  // Método para lidar com o cadastro de alunos
  cadastrarAluno: async (req: Request, res: Response) => {
    try {
      const { nome, email, senha, universidade, curso } = req.body;

      const novoAluno = await alunosService.cadastrarAluno(
        nome,
        email,
        senha,
        universidade,
        curso
      );

      res.status(201).json({ mensagem: 'Cadastro de aluno bem-sucedido', aluno: novoAluno });
    } catch (error: any) {
      res.status(500).json({ mensagem: 'Erro ao cadastrar aluno', erro: error.message });
    }
  },
};

export default alunosController;
