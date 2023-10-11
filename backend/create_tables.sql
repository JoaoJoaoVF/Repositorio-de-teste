-- Criação da tabela "alunos"
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  curso VARCHAR(255) NOT NULL,
  universidade VARCHAR(255) NOT NULL
);

-- Criação de um índice na coluna "email" para melhorar o desempenho de consultas
CREATE INDEX idx_email ON alunos (email);

-- Inserção de dados de amostra
INSERT INTO alunos (nome, email, senha, curso, universidade)
VALUES
  ('Exemplo 1', 'exemplo1@email.com', 'senha123', 'Curso A', 'Universidade X'),
  ('Exemplo 2', 'exemplo2@email.com', 'senha456', 'Curso B', 'Universidade Y');

