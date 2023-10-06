import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { QueryTypes } from 'sequelize';
import db from '../config/database'; 

const authController = {
  login: async (req: Request, res: Response) => {
    // Valide os dados de entrada do usuário
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, senha } = req.body;

      const query = 'SELECT * FROM alunos WHERE email = ?';
      const [rows]: any[] = await db.query(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
      });

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(senha, user.senha);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, 'secreto', {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};

export default authController;
