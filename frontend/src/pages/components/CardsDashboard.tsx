import { useState, useEffect } from 'react';
import 'chart.js/auto';

import Logo from '../../assets/img/Logo_UFMG.png';

export default function CardsDashboard() {
    // Defina suas variáveis aqui
    const curso = 'Sistemas de Informação';
    const universidade = 'Universidade Federal de Minas Gerais';
    const periodo = '5';
    const disciplinas = ['Disciplina 1', 'Disciplina 2', 'Disciplina 3'];
    const forunsText = 'Você ainda não possui fóruns para participar.';
    const avaliacoesText = 'Você ainda não possui avaliações para fazer.';

    return (
        <div>
            <div className='container-fluid'>
                <div className="b-example-divider"></div>

                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{curso}</h1>
                            <h2 className="display-8 mb-3">{universidade}</h2>
                            <h3 className="display-8 text-#173FBC">{periodo}º Período</h3>
                        </div>
                        <div className="col-lg-6">
                            <img src={Logo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                        </div>
                    </div>
                </div>

                <div className="card-deck row">
                    <div className="card col-md-4">
                        <div className="card-body">
                            <h5 className="card-title">Minhas disciplinas</h5>
                            <ul className="list-unstyled text-gray">
                                {disciplinas.map((disciplina, index) => (
                                    <li key={index}>{disciplina}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card col-md-4">
                        <div className="card-body">
                            <h5 className="card-title">Fóruns</h5>
                            <p className="card-text text-gray">{forunsText}</p>
                        </div>
                    </div>
                    <div className="card col-md-4">
                        <div className="card-body">
                            <h5 className="card-title">Avaliações</h5>
                            <p className="card-text text-gray">{avaliacoesText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
