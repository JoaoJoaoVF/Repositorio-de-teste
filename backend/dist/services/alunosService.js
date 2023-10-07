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
const sequelize_1 = require("sequelize");
const alunoModel_1 = __importDefault(require("../models/alunoModel"));
const database_1 = __importDefault(require("../config/database"));
const alunosService = {
    cadastrarAluno: (nome, email, senha, universidade, curso) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO alunos (nome, email, senha, universidade, curso) VALUES (?, ?, ?, ?, ?)`;
            const options = { replacements: [nome, email, senha, universidade, curso], type: sequelize_1.QueryTypes.INSERT };
            const [result] = yield database_1.default.query(query, options);
            if (result && result[1] === 1) {
                const alunoId = result[0];
                if (typeof alunoId === 'number') {
                    const alunoCriado = yield alunoModel_1.default.findByPk(alunoId);
                    if (alunoCriado) {
                        return alunoCriado;
                    }
                    else {
                        throw new Error('Não foi possível encontrar o aluno recém-cadastrado.');
                    }
                }
                else {
                    throw new Error('O id do aluno não é um número.');
                }
            }
            else {
                throw new Error('Não foi possível cadastrar o aluno.');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw error; // Lança o erro se for uma instância de Error
            }
            else {
                throw new Error('Erro desconhecido'); // Lança um erro genérico em outros casos
            }
        }
    }),
};
exports.default = alunosService;
//# sourceMappingURL=alunosService.js.map