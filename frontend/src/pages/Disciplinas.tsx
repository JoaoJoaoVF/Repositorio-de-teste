import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import TabelaDisciplinas from './components/TabelaDisciplinas'
import 'chart.js/auto';

export default function Disciplinas() {

    return (
        <DashboardLayout >
            <TabelaDisciplinas />
        </DashboardLayout>
    );
}