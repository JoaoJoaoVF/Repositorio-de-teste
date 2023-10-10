import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import NaoImplementado from './components/NaoImplementado'
import 'chart.js/auto';

export default function Perfil() {

    return (
        <DashboardLayout >
            <NaoImplementado />
        </DashboardLayout>
    );
}