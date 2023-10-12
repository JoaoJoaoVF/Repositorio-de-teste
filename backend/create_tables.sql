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

-- Criação da tabela "avaliacoes_professores" para avaliações de professores
CREATE TABLE IF NOT EXISTS avaliacoes_professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT, -- ID do aluno que escreveu a avaliação
  professor_nome VARCHAR(255), -- Nome do professor avaliado
  professor_materia VARCHAR(255), -- Matéria do professor avaliado
  professor_universidade VARCHAR(255), -- Universidade do professor avaliado
  avaliacao_texto TEXT, -- Texto da avaliação
  aprovada TINYINT(1) DEFAULT 0 -- 0 represents false, 1 represents true
);
