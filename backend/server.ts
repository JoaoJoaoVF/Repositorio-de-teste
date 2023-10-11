import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql , { ResultSetHeader } from 'mysql2';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3000;
const segredo = 'ohohohoh';

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

// Rota de registro
app.post('/registro', (req: Request, res: Response) => {
  // Receba os dados do corpo da solicitação (req.body)
  const { nome, email, senha, curso, universidade } = req.body;

  // Valide os dados (verifique se os campos não estão vazios, por exemplo)

  // Crie um novo registro de aluno no banco de dados
  const aluno = { nome, email, senha, curso, universidade };
  connection.execute('INSERT INTO alunos (nome, email,senha,curso,universidade) VALUES (?,?,?,?,?)', [aluno.nome, aluno.email, aluno.senha, aluno.curso, aluno.universidade], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    } else {
      console.log('Aluno cadastrado com sucesso');
      res.status(200).json({ mensagem: 'Cadastro bem-sucedido' });
    }
  });
});

// Rota de login
type QueryResult = mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader;

app.post('/login', (req: Request, res: Response) => {
  // Receive login data from the request body (req.body)
  const { email, senha } = req.body;

  // Verify if the email and password match a record in the database
  connection.execute(
    'SELECT * FROM alunos WHERE email = ? AND senha = ?',
    [email, senha],
    (error, results: ResultSetHeader) => { // Use ResultSetHeader
      if (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      } else if (results.affectedRows === 0) { // Check if no rows were affected
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
      } else {
        // Generate an access token
        const token = jwt.sign(
          { id: results.insertId, email }, // Access insertId for the new row's ID
          segredo,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
