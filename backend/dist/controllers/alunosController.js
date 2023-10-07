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
const alunosService_1 = __importDefault(require("../services/alunosService"));
const alunosController = {
    // Método para lidar com o cadastro de alunos
    cadastrarAluno: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { nome, email, senha, universidade, curso } = req.body;
            const novoAluno = yield alunosService_1.default.cadastrarAluno(nome, email, senha, universidade, curso);
            res.status(201).json({ mensagem: 'Cadastro de aluno bem-sucedido', aluno: novoAluno });
        }
        catch (error) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar aluno', erro: error.message });
        }
    }),
};
exports.default = alunosController;
//# sourceMappingURL=alunosController.js.map