import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Aluno extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public universidade!: string;
  public curso!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Aluno.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    universidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'alunos',
  }
);

export default Aluno;
