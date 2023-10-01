import express from 'express';
import bodyParser from 'body-parser';
import mysql, { Connection } from 'mysql2';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });