"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alunosService_1 = __importDefault(require("./services/alunosService"));
const authController_1 = __importDefault(require("./controllers/authController"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Rota para o registro (cadastro) de alunos
const alunosController = {
    cadastrarAluno: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { nome, email, senha, universidade, curso } = req.body;
            // Agora você pode usar os valores extraídos do corpo da solicitação para cadastrar o aluno
            const novoAluno = yield alunosService_1.default.cadastrarAluno(nome, email, senha, universidade, curso);
            res.status(201).json({ mensagem: 'Cadastro de aluno bem-sucedido', aluno: novoAluno });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ mensagem: 'Erro ao cadastrar aluno', erro: error.message });
            }
            else {
                res.status(500).json({ mensagem: 'Erro desconhecido' });
            }
        }
    }),
};
// Rota para o login (authController)
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        // Chame a função do controlador para fazer login (authController)
        const token = yield authController_1.default.login(email, senha);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ mensagem: 'Credenciais inválidas', erro: error.message });
        }
        else {
            res.status(500).json({ mensagem: 'Erro desconhecido' });
        }
    }
}));
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
//# sourceMappingURL=app.js.map