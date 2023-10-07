"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alunosController_1 = __importDefault(require("../controllers/alunosController"));
const router = (0, express_1.Router)();
router.post('/cadastro', alunosController_1.default.cadastrarAluno);
exports.default = router;
//# sourceMappingURL=alunosRoutes.js.map