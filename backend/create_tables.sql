-- Criação da tabela "user"
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  curso VARCHAR(255) NOT NULL,
  universidade VARCHAR(255) NOT NULL,
  tipo TINYINT(1) NOT NULL DEFAULT 1 -- 0 para moderador, 1 para aluno
);

-- Criação de um índice na coluna "email" para melhorar o desempenho de consultas
CREATE INDEX idx_email ON alunos (email);

-- Criação da tabela "avaliacoes_professores"
CREATE TABLE IF NOT EXISTS avaliacoes_professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT, -- ID do aluno que escreveu a avaliação
  professor_nome VARCHAR(255), -- Nome do professor avaliado
  professor_materia VARCHAR(255), -- Matéria do professor avaliado
  professor_universidade VARCHAR(255), -- Universidade do professor avaliado
  semestre VARCHAR(10) NOT NULL, -- Exemplo: 2023/2
  nota INT NOT NULL CHECK (nota >= 1 AND nota <= 10), -- Nota de 1 a 10
  departamento VARCHAR(255) NOT NULL, -- Nome do departamento do professor avaliado
  avaliacao_texto TEXT, -- Texto da avaliação
  aprovada TINYINT(1) DEFAULT 0, -- 0 representa falso, 1 representa verdadeiro
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) 
);

