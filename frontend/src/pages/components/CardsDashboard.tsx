import { useState, useEffect } from 'react';
import 'chart.js/auto';

import Logo from '../../assets/img/Logo_UFMG.png'

export default function CardsDashboard() {

    return (
        <div >
            <div className='container-fluid'>
                <div className="b-example-divider"></div>

                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Sistemas de Informação</h1>
                            <h2 className="display-8 mb-3">Universidade Federal de Minas Gerais</h2>
                            <h3 className="display-8 text-#173FBC">6º Periodo</h3>
                        </div>
                        <div className="col-lg-6">
                            <img src={Logo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                        </div>
                    </div>
                </div>


                <div className="card-deck row">
                    <div className="card col-md-4">
                        {/* <img className="card-img-top" src=".../100px180/" alt="Imagem de capa do card"> */}
                        <div className="card-body">
                            <h5 className="card-title">Minhas disciplinas</h5>
                            <p className="card-text text-gray">Este é um card maior com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este conteúdo é um pouco maior, para demonstração.</p>
                        </div>
                        {/* <div className="card-footer">
                            <small className="text-muted">Atualizados 3 minutos atrás</small>
                        </div> */}
                    </div>
                    <div className="card col-md-4">
                        {/* <img className="card-img-top" src=".../100px180/" alt="Imagem de capa do card"> */}
                        <div className="card-body">
                            <h5 className="card-title">Fóruns</h5>
                            <p className="card-text text-gray">Este é um card com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
                        </div>
                        {/* <div className="card-footer">
                            <small className="text-muted">Atualizados 3 minutos atrás</small>
                        </div> */}
                    </div>
                    <div className="card col-md-4">
                        {/* <img className="card-img-top" src=".../100px180/" alt="Imagem de capa do card"> */}
                        <div className="card-body">
                            <h5 className="card-title">Avaliações</h5>
                            <p className="card-text text-gray">Este é um card maior com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este card tem o conteúdo ainda maior que o primeiro, para mostrar a altura igual, em ação.</p>
                        </div>
                        {/* <div className="card-footer">
                            <small className="text-muted">Atualizados 3 minutos atrás</small>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}