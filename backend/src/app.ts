import express from 'express';
import alunosService from './services/alunosService';
import authController from './controllers/authController';

const app = express();
const port = 3000;

app.use(express.json());

// Rota para o registro (cadastro) de alunos
const alunosController = {
  cadastrarAluno: async (req: express.Request, res: express.Response) => {
    try {
      const { nome, email, senha, universidade, curso } = req.body;

      // Agora você pode usar os valores extraídos do corpo da solicitação para cadastrar o aluno
      const novoAluno = await alunosService.cadastrarAluno(nome, email, senha, universidade, curso);

      res.status(201).json({ mensagem: 'Cadastro de aluno bem-sucedido', aluno: novoAluno });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar aluno', erro: error.message });
      } else {
        res.status(500).json({ mensagem: 'Erro desconhecido' });
      }
    }
  },
};

// Rota para o login (authController)
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Chame a função do controlador para fazer login (authController)
    const token = await authController.login(email, senha);

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ mensagem: 'Credenciais inválidas', erro: error.message });
    } else {
      res.status(500).json({ mensagem: 'Erro desconhecido' });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
