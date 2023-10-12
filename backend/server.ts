import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const port = process.env.PORT || 3000;
const segredo = 'ohohohoh';
const saltRounds = 12; // Número de iterações para o bcrypt

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123',
  database: 'unishare',
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Função para verificar se um email é válido
function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

// Rota de registro
app.post('/registro', (req: Request, res: Response) => {
  // Receba os dados do corpo da solicitação (req.body)
  const { nome, email, senha, curso, universidade } = req.body;

  // Valide os dados
  if (!nome || !email || !senha || !curso || !universidade) {
    res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    return;
  }

  // Verifique se o email é válido
  if (!isValidEmail(email)) {
    res.status(400).json({ mensagem: 'O email fornecido não é válido' });
    return;
  }

  // Verifique se o email já existe no banco de dados
  connection.query('SELECT * FROM alunos WHERE email = ?', [email], (error, results: any) => {
    if (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    } else {
      // Verifique o tipo de resultado da consulta
      if (Array.isArray(results) && results.length > 0) {
        res.status(409).json({ mensagem: 'Este email já está cadastrado' });
      } else {
        // Crie um novo registro de aluno no banco de dados
        bcrypt.hash(senha, saltRounds, (err: Error | null, hashedPassword: string) => {
          if (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
          } else {
            const aluno = { nome, email, senha: hashedPassword, curso, universidade };
            connection.query(
              'INSERT INTO alunos (nome, email, senha, curso, universidade) VALUES (?, ?, ?, ?, ?)',
              [aluno.nome, aluno.email, aluno.senha, aluno.curso, aluno.universidade],
              (error, _results) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ mensagem: 'Erro interno do servidor' });
                } else {
                  console.log('Aluno cadastrado com sucesso');
                  res.status(200).json({ mensagem: 'Cadastro bem-sucedido' });
                }
              }
            );
          }
        });
      }
    }
  });
});

// Rota de login
app.post('/login', (req: Request, res: Response) => {
  // Receive login data from the request body (req.body)
  const { email, senha } = req.body;

  // Convert both emails to lowercase for case-insensitive comparison
  const normalizedEmail = email.toLowerCase();

  // Verify if the email exists in the database
  connection.execute(
    'SELECT * FROM alunos WHERE LOWER(email) = ?',
    [normalizedEmail],
    (error, results: any) => {
      if (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      } else if (results.length === 0) {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
      } else {
        const user = results[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(senha, user.senha, (err: Error | null, passwordMatch: boolean) => {
          if (err !== null) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
          } else if (!passwordMatch) {
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
          } else {
            // Generate an access token
            const token = jwt.sign(
              { id: user.id, email },
              segredo,
              { expiresIn: '1h' }
            );
            res.status(200).json({ token });
          }
        });
      }
    }
  );
});

// Rota para escrever avaliações sobre professores
app.post('/avaliar-professor', (req: Request, res: Response) => {
  const { alunoId, professorNome, professorMateria, professorUniversidade, avaliacaoTexto } = req.body;

  // Valide os dados
  if (!alunoId || !professorNome || !professorMateria || !professorUniversidade || !avaliacaoTexto) {
    res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    return;
  }

  // Verifique se o alunoId é válido, por exemplo, se existe no banco de dados
  connection.execute('SELECT * FROM alunos WHERE id = ?', [alunoId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    } else if (Array.isArray(results) && results.length <= 0) {
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
    } else {
      // Crie um novo registro de avaliação no banco de dados
      connection.execute(
        'INSERT INTO avaliacoes_professores (aluno_id, professor_nome, professor_materia, professor_universidade, avaliacao_texto, aprovada) VALUES (?, ?, ?, ?, ?, false)',
        [alunoId, professorNome, professorMateria, professorUniversidade, avaliacaoTexto],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro interno do servidor' });
          } else {
            console.log('Avaliação do professor cadastrada com sucesso e aguardando aprovação');
            res.status(200).json({ mensagem: 'Avaliação cadastrada com sucesso e aguardando aprovação' });
          }
        }
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
