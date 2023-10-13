import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import TabelaAprovacaoAvalicao from './components/TabelaAprovacaoAvalicao'
import 'chart.js/auto';

export default function AprovacaoAvalicao() {

    return (
        <DashboardLayout >
            <TabelaAprovacaoAvalicao />
        </DashboardLayout>
    );
}