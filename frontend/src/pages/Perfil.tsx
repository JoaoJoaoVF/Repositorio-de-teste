import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import NaoImplementado from './components/NaoImplementado'
import 'chart.js/auto';
import { useNavigate } from 'react-router';

export default function Perfil() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // O token não existe, redirecione o usuário para a página de login.
            navigate('/login');
        }
        // Se o token existir, o usuário permanecerá na página do painel.
    }, [navigate]);

    return (
        <DashboardLayout >
            <NaoImplementado />
        </DashboardLayout>
    );
}