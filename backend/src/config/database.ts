import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nome_do_banco', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export default sequelize;
