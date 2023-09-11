import { useState } from 'react';
import { Link } from "react-router-dom";
import 'chart.js/auto';

import Logo from '../assets/img/DraftLogoWithoutText.png';

export default function About() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='col-md-6 mb-2  mb-md-0'>
            <Link to="/" >
                    <button className="btn btn-primary mt-2" style={{ backgroundColor: '#173FBC'}}>
                    Ir para o início
                    </button>
                </Link>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center'> {/* Centralize a imagem */}
                        <img src={Logo} alt="logo" role="img" />
                    </div>
                    <h1 className="h3 mb-5 fw-normal text-center text-#9582A1">Login do Usuário</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <label htmlFor="floatingInput">Identificação / E-mail</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Mantenha-me conectado
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" style={{ backgroundColor: '#9582A1'}} type="submit">
                        Entrar
                    </button>
                    <div className="text-center mt-3">
                        <a href="/esqueceu-senha">Esqueceu a senha?</a>
                        <span className="mx-2">|</span>
                        <a href="/cadastro">Cadastrar-se</a>
                    </div>
                    
                    <p className="mt-5 mb-3 text-muted text-center">&copy; Unishare, 2023</p>
                </form>
            </div>
        </div>
    );
}