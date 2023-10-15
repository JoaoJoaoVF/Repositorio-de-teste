import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { ResultSetHeader } from 'mysql2';
import { RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const port = process.env.PORT || 3000;
const segredo = 'ohohohoh';
const saltRounds = 12; // Número de iterações para o bcrypt
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

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
  const { professorNome, professorMateria, professorUniversidade, semestre, nota, departamento, avaliacaoTexto } = req.body;

  // Valide os dados
  if (!professorNome || !professorMateria || !professorUniversidade || !semestre || !nota || !departamento || !avaliacaoTexto) {
    res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    return;
  }

  // Verifique o tipo de usuário no banco de dados com base no token JWT
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const jwtOptions = {
  };

  jwt.verify(token, segredo, jwtOptions, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    const alunoId = (decoded as any).id;
    if (alunoId === undefined) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Crie um novo registro de avaliação no banco de dados
    connection.execute(
      'INSERT INTO avaliacoes_professores (aluno_id, professor_nome, professor_materia, professor_universidade, semestre, nota, departamento, avaliacao_texto, aprovada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, false)',
      [alunoId, professorNome, professorMateria, professorUniversidade, semestre, nota, departamento, avaliacaoTexto],
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
  });
});

// Rota para obter o tipo de usuário com base no ID
app.get('/tipo-usuario/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10); // Extrai o ID do parâmetro da URL

  if (isNaN(userId)) {
    res.status(400).json({ mensagem: 'ID de usuário inválido' });
    return;
  }

  // Verifique o tipo de usuário no banco de dados
  connection.execute(
    'SELECT tipo FROM alunos WHERE id = ?',
    [userId],
    (error, results: any) => {
      if (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      } else if (results.length === 0) {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
      } else {
        const tipoUsuario = results[0].tipo;
        res.status(200).json({ tipo: tipoUsuario });
      }
    }
  );
});

// Rota para aprovar uma avaliação pendente
app.post('/aprovar-avaliacao/:avaliacaoId', (req: Request, res: Response) => {
  const avaliacaoId = req.params.avaliacaoId;

  // Verifique o tipo de usuário com base no token JWT
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const jwtOptions = {

  };

  jwt.verify(token, segredo, jwtOptions, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    const userId = (decoded as any).id;
    if (userId === undefined) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Verifique o tipo de usuário no banco de dados usando a rota existente
    connection.execute(
      'SELECT tipo FROM alunos WHERE id = ?',
      [userId],
      (error, results: any) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        } else if (results.length === 0) {
          return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        } else {
          const tipoUsuario = results[0].tipo;

          // Verifique se o tipo de usuário é um moderador (tipo 0)
          if (tipoUsuario !== 0) {
            return res.status(403).json({ mensagem: 'Acesso não autorizado' });
          }

          // Aprovar a avaliação no banco de dados
          connection.execute(
            'UPDATE avaliacoes_professores SET aprovada = 1 WHERE id = ?',
            [avaliacaoId],
            (error, _results) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ mensagem: 'Erro interno do servidor' });
              } else {
                return res.status(200).json({ mensagem: 'Avaliação aprovada com sucesso' });
              }
            }
          );
        }
      }
    );
  });
});

// Rota para listar avaliações pendentes
app.get('/avaliacoes-pendentes', (req: Request, res: Response) => {

  // Verifique o tipo de usuário com base no token JWT
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const jwtOptions = {

  };

  jwt.verify(token, segredo, jwtOptions, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    const userId = (decoded as any).id;
    if (userId === undefined) {
      return res.status(401).json({ mensagem: 'Token inválido' });
    }

    // Verifique o tipo de usuário no banco de dados usando a rota existente
    connection.execute(
      'SELECT tipo FROM alunos WHERE id = ?',
      [userId],
      (error, results: any) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        } else if (results.length === 0) {
          return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        } else {
          const tipoUsuario = results[0].tipo;

          // Verifique se o tipo de usuário é um moderador (tipo 0)
          if (tipoUsuario !== 0) {
            return res.status(403).json({ mensagem: 'Acesso não autorizado' });
          }


          // Consulta para listar avaliações pendentes de aprovação
          connection.query(
            'SELECT * FROM avaliacoes_professores WHERE aprovada = 0',
            (error, results: any) => {
              if (error) {
                console.error(error);
                res.status(500).json({ mensagem: 'Erro interno do servidor' });
              } else {
                res.status(200).json(results);
              }
            }
          );
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
