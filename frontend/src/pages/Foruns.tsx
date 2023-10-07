import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import NaoImplementado from './components/NaoImplementado'
import 'chart.js/auto';

export default function Foruns() {

    return (
        <DashboardLayout >
            <NaoImplementado />
        </DashboardLayout>
    );
}