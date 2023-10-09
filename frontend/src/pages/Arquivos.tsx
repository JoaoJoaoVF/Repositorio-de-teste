import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/dashboard';
import 'chart.js/auto';
import UploadArquivos from './components/UploadArquivos';

export default function Arquivos() {

    return (
        <DashboardLayout >
            <UploadArquivos />
        </DashboardLayout>
    );
}