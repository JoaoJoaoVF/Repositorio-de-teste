# Trabalho Prático 1 — Engenharia de Software I

## Objetivo:

O objetivo central do projeto nomeado como "Unishare", é desenvolver uma plataforma inovadora e colaborativa que incentive e simplifique o compartilhamento de materiais acadêmicos entre os estudantes universitários. Através da integração de funcionalidades avançadas de avaliação e sistemas de acesso intuitivos, buscamos aprimorar significativamente a experiência geral dos usuários.

Nosso projeto visa criar um ambiente onde os alunos não apenas compartilham seus materiais acadêmicos, mas também têm a oportunidade de avaliar a qualidade e utilidade desses recursos. Isso resultará em uma comunidade colaborativa onde o conhecimento é compartilhado de forma mais eficaz.

Além disso, a plataforma "Unishare" proporcionará um espaço para que os alunos troquem perspectivas e opiniões sobre professores e disciplinas. Isso permitirá que os estudantes tomem decisões informadas sobre suas escolhas acadêmicas, melhorando a qualidade de sua jornada educacional.

Ao preencher as lacunas existentes no cenário acadêmico, nosso projeto tem como missão facilitar o acesso amplo e simplificado ao conhecimento para os universitários. Através da plataforma Unishare, esperamos empoderar os alunos, permitindo que eles colaborem, aprendam uns com os outros e tomem decisões informadas, elevando assim o padrão da educação superior.

## Principais Features

Entre as principais features da plataforma estão:

- Cadastro na plataforma
- Login na plataforma
- Upload de arquivos
- Escrita de avaliações
- Seção de discussões

## Membros da equipe:

#### Front-end

- João Vitor Ferreira

#### Back-end

- André Alves de Souza Barros
- Vinícius de Oliveira Silva


## Tecnologias

### Front-end

<code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px" ></a></code>
<code><a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="50px" height="50px" ></a></code>
<code><a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="50px" height="50px" ></a></code>
<code><a href="https://vitejs.dev/" title="React"><img src="https://raw.githubusercontent.com/get-icon/geticon/master/icons/vite.svg" alt="Vite" width="50px" height="50px" ></a></code>

	Linguagem de Programação: TypeScript
	Framework de UI: ReactJs + Vite
	
### Back-end

<code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px" ></a></code>
<code><a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript" width="50px" height="50px" ></a></code>
<code><a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="50px" height="50px"></a></code>
<code><a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express" width="50px" height="50px"></a></code>

	Linguagem de Programação: TypeScript
	Engine: NodeJs
	Framework: Express
	Banco de Dados: MySQL

## Backlog do Produto

1. Como aluno, eu gostaria de me cadastrar na plataforma.
2. Como aluno, eu gostaria de fazer login na plataforma.
3. Como aluno, eu gostaria de cadastrar uma disciplina.
4. Como aluno, eu gostaria de enviar um arquivo.
5. Como aluno, eu gostaria de escrever uma avaliação sobre um professor.
6. Como aluno, eu gostaria de escrever uma avaliação sobre uma disciplina.
7. Como aluno, eu gostaria de avaliar um resumo.
8. Como aluno, eu gostaria de comentar em um arquivo.
9. Como aluno, eu gostaria de pesquisar avaliações de professores de uma disciplina.
10. Como aluno, eu gostaria de pesquisar avaliações de uma disciplina.
11. Como aluno, eu gostaria de criar um tópico no fórum de uma disciplina.
12. Como aluno, eu gostaria de responder um tópico em um fórum.
13. Como moderador, eu gostaria de avaliar os arquivos submetidos.
14. Como moderador, gostaria de gerenciar avaliações pendentes de aprovação.

## Backlog do sprint

### História #1: Como aluno, eu gostaria de me cadastrar na plataforma:

#### Tarefas e responsáveis:
	- Implementar versão inicial da tela principal [João]
	- Implementar tela de cadastro [João]
	- Criar uma rota para receber os dados do formulário de cadastro [Vinícius]
	- Criar um novo registro de aluno no banco de dados [Vinícius]
	- Retornar uma resposta ao cliente informando se o cadastro foi bem-sucedido [Vinícius]

### História #2:  Como aluno, eu gostaria de fazer login na plataforma:

#### Tarefas e responsáveis:
	- Implementar tela de login [João]
	- Implementar dashboard  [Vinícius]
	- Implementar a lógica de autenticação [Vinícius]
	- Gerar um token de acesso e enviá-lo de volta ao usuário [Vinícius]

### História #3:  Como moderador, gostaria de gerenciar avaliações pendentes de aprovação:

#### Tarefas e responsáveis:
	- Criar uma interface de administração para moderadores [João]
	- Criar uma rota para listar avaliações pendentes de aprovação [André] 
	- Exibir a lista de avaliações pendentes na interface de administração [João]
	- Criar uma rota no backend para aprovar uma avaliação específica [André] 
	- Atualizar o status da avaliação no banco de dados para refletir a aprovação  [André] 

### História #4:  Como aluno, eu gostaria de escrever uma avaliação sobre um professor:

#### Tarefas e responsáveis:
	- Criar uma página para escrever avaliações de professores [João]
	- Implementar um formulário para avaliação [Vinícius]	
	- Criar uma rota para receber os dados da avaliação [Vinícius]
	- Criar um novo registro de avaliação no banco de dados, associando-o ao professor [Vinícius]

### História #5:  Como aluno, eu gostaria de pesquisar avaliações de professores de uma disciplina:

#### Tarefas e responsáveis:
	- Criar uma interface de pesquisa [João]
	- Criar uma rota para receber a consulta de pesquisa [André]
	- Implementar uma função que envia a consulta de pesquisa para o servidor [André] 
	- Realizar a pesquisa no banco de dados com base nos critérios da consulta [André] 
	- Retornar os resultados da pesquisa para o cliente [André] 
	- Exibir os resultados da pesquisa na interface [João]

### História #6:  Como aluno, eu gostaria de escrever uma avaliação sobre uma disciplina:

#### Tarefas e responsáveis:

	- Criar a Página de Avaliação [João]
	- Validação de Dados da Avaliação []
	- Integração com o Banco de Dados []
	- Página de Visualização de Avaliações [João]
	- Implementar Autenticação e Autorização []

### História #7:  Como aluno, eu gostaria de avaliar um resumo:

#### Tarefas e responsáveis:

	- Criar Rotas para Avaliações []
	- Criar um Controlador de Avaliações []
	- Integrar Autenticação []
	- Atualizar a Interface do Usuário [João]

### História #8:  Como aluno, eu gostaria de comentar em um arquivo.:

#### Tarefas e responsáveis:

	- Criar Interface de Comentários [João]
	- Conectar Comentários aos Arquivos []
	- Autenticação de Usuários []
	- Atualizar a Interface do Usuário [João]

### História #9:  Como aluno, eu gostaria de pesquisar avaliações de professores de uma disciplina.:

#### Tarefas e responsáveis:

	- Configurar a Interface de Pesquisa [João]
	- Desenvolver a Lógica de Pesquisa []
	- Classificação e Filtragem de Resultados []
	- Integrar com o Sistema de Avaliações []

### História #10: Como aluno, eu gostaria de pesquisar avaliações de uma disciplina :

#### Tarefas e responsáveis:

	- Criar Interface de Pesquisa [João]
	- Integração de Dados de Avaliações []
	- Criar uma página de detalhes para cada disciplina [João]
	- Funcionalidades Adicionais e Filtros []
