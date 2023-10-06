import { QueryOptions, QueryTypes } from 'sequelize';
import Aluno from '../models/alunoModel';
import db from '../config/database';

const alunosService = {
  cadastrarAluno: async (
    nome: string,
    email: string,
    senha: string,
    universidade: string,
    curso: string
  ): Promise<Aluno | null> => {
    try {
      const query = `INSERT INTO alunos (nome, email, senha, universidade, curso) VALUES (?, ?, ?, ?, ?)`;
      const options: QueryOptions = { replacements: [nome, email, senha, universidade, curso], type: QueryTypes.INSERT };
      const [result] = await db.query(query, options);

      if (result && result[1] === 1) {
        const alunoId = result[0];
        if (typeof alunoId === 'number') {
          const alunoCriado = await Aluno.findByPk(alunoId);
          if (alunoCriado) {
            return alunoCriado;
          } else {
            throw new Error('Não foi possível encontrar o aluno recém-cadastrado.');
          }
        } else {
          throw new Error('O id do aluno não é um número.');
        }
      } else {
        throw new Error('Não foi possível cadastrar o aluno.');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error; // Lança o erro se for uma instância de Error
      } else {
        throw new Error('Erro desconhecido'); // Lança um erro genérico em outros casos
      }
    }
  },
};

export default alunosService;
