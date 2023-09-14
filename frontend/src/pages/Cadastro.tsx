import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'chart.js/auto';

import Logo from '../assets/img/DraftLogoWithoutText.png';

export default function SignUp() {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        confirmarEmail: '',
        senha: '',
        confirmarSenha: '',
        ddd: '',
        celular: '',
        universidade: '',
        dataNascimento: '',
        CPF: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const senhaValida = (senha: string) => {
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return senhaRegex.test(senha);
    };

    const dataNascimentoValida = (dataNascimento: string) => {
        const hoje = new Date();
        const dataNascimentoDate = new Date(dataNascimento);
        let idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();

        if (mesAtual < dataNascimentoDate.getMonth() || (mesAtual === dataNascimentoDate.getMonth() && diaAtual < dataNascimentoDate.getDate())) {
            idade--;
        }

        return idade >= 17;
    };

    const dddValido = (ddd: string) => {
        // Aceita DDDs válidos no Brasil, que são dois dígitos numéricos.
        const dddRegex = /^\d{2}$/;
        return dddRegex.test(ddd);
    };

    const celularValido = (celular: string) => {
        // Aceita números de celular com formato: 9XXXX-XXXX ou 9 XXXX-XXXX
        const celularRegex = /^9\s?\d{8}$/;
        return celularRegex.test(celular);
    };

    const cpfValido = (CPF: string) => {
        // Aceita CPFs com formato XXXXXXXXXXX (11 dígitos sem pontos ou hífen)
        const cpfRegex = /^\d{11}$/;
        return cpfRegex.test(CPF);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verifique se as senhas são idênticas
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        // Verifique se os emails são idênticas
        if (formData.email !== formData.confirmarEmail) {
            alert("Os emails não coincidem.");
            return;
        }

        // Verifique se a senha atende aos critérios
        if (!senhaValida(formData.senha)) {
            alert("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos especiais.");
            return;
        }

        // Verifique se a data de nascimento é válida
        if (!dataNascimentoValida(formData.dataNascimento)) {
            alert("Você deve ter mais de 17 anos para se cadastrar.");
            return;
        }

        // Verifique se o celular é válido
        if (!dddValido(formData.ddd)) {
            alert("O numero de DDD não é válido.");
            return;
        }

        // Verifique se o celular é válido
        if (!celularValido(formData.celular)) {
            alert("O numero de telefone não é válido.");
            return;
        }

        // Verifique se o CPF é válido
        // Verifique se o CPF é válido
        if (!cpfValido(formData.CPF)) {
            alert("O número de CPF não é válido.");
            return;
        }


        // Resto do código para o envio dos dados do formulário
    };


    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='col-md-6 mb-2  mb-md-0'>
                <Link to="/" >
                    <button className="btn btn-primary mt-2" style={{ backgroundColor: '#173FBC' }}>
                        Ir para o início
                    </button>
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center'>
                        <img src={Logo} alt="logo" role="img" />
                    </div>
                    <h1 className="h3 mb-4 fw-normal text-center text-#9582A1">Faça seu cadastro :)</h1>
                    <p className="h3 mb-15 fw-normal text-center text-#173FBC">Junte-se à comunidade Unishare e desbloqueie seu potencial acadêmico!</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="nome">Nome</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sobrenome"
                                    name="sobrenome"
                                    placeholder="Sobrenome"
                                    value={formData.sobrenome}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="sobrenome">Sobrenome</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="confirmarEmail"
                                    name="confirmarEmail"
                                    placeholder="Confirme seu E-mail"
                                    value={formData.confirmarEmail}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="confirmarEmail">Confirmar E-mail</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    name="senha"
                                    placeholder="Senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="senha">Senha</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    placeholder="Confirme sua Senha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ddd"
                                    name="ddd"
                                    placeholder="DDD"
                                    value={formData.ddd}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="ddd">DDD</label>
                            </div>
                        </div>
                        <div className="col-md-11">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="celular"
                                    name="celular"
                                    placeholder="Número"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="celular">Celular (SOMENTE NUMEROS)</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="universidade"
                                    name="universidade"
                                    placeholder="Universidade"
                                    value={formData.universidade}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="Digite sua universidade">Digite sua universidade</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CPF"
                                    name="CPF"
                                    placeholder="CPF"
                                    value={formData.CPF}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="CPF">CPF</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-1">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="dataNascimento">Data de Nascimento</label>
                            </div>
                        </div>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" style={{ backgroundColor: '#9582A1' }} type="submit">
                        Crie seu Cadastro
                    </button>
                    <div className="text-center mt-3">
                        <a>Já possui cadastro? Faça seu </a><Link to="/login">login</Link>
                    </div>
                    <p className="mt-5 mb-3 text-muted text-center">&copy; Unishare, 2023</p>
                </form>
            </div>
        </div>
    );
}