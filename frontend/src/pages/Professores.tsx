import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import TabelaProfessores from './components/TabelaProfessores'
import 'chart.js/auto';

export default function Professores() {

    return (
        <DashboardLayout >
            <TabelaProfessores />
        </DashboardLayout>
    );
}