import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Home from '../layouts/home';
import DiferenciaisDoUnishare from './components/DiferenciaisDoUnishare';
import BemVindoAoUnishare from './components/BemVindoAoUnishare';
import MissaoValoresVisao from './components/MissaoValoresVisao';
import ObjetivosUnishare from './components/ObjetivosUnishare';

import '../assets/css/Main.css';

export default function HomePage() {

    return (
        <Home>
            <div className='container-fluid'>
                <div className='row'>

                <button className='btn btn-primary btn-lg btn-block'>
                        <Link to='/dashboard' className='text-white'>
                            Dashboard
                        </Link>
                    </button>
                    
                    <BemVindoAoUnishare />

                    <MissaoValoresVisao />

                    <ObjetivosUnishare />

                    <DiferenciaisDoUnishare />

                </div>
            </div>
        </Home >
    );
}

