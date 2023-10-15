import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import ModalUploadArquivo from './ModalUploadArquivo';

interface Arquivo {
    id: number;
    nomeArquivo: string;
    materia: string;
    professor: string;
    semestre: string;
    tipo: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#7988b7',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UploadArquivos() {
    const [arquivos, setArquivos] = useState<Arquivo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const exemploArquivos: Arquivo[] = [
            { id: 1, nomeArquivo: 'Exemplo', materia: 'Matemática', professor: 'Professor 1', semestre: '2023/2', tipo: 'Lista' },
            { id: 2, nomeArquivo: 'Apresentacao', materia: 'História', professor: 'Professor 2', semestre: '2023/1', tipo: 'Slide' },
        ];

        setArquivos(exemploArquivos);
    }, []);

    const handleUploadFile = (file: File) => {
        console.log('Arquivo selecionado:', file.name);
    };

    const handleTableRowClick = () => {
        window.open('', 'Popup', 'width=600,height=400');
    };

    return (
        <div className='container-fluid'>
            <TableContainer component={Paper}>
                <Table aria-label="tabela-arquivos">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nome do Arquivo</StyledTableCell>
                            <StyledTableCell>Matéria</StyledTableCell>
                            <StyledTableCell>Professor</StyledTableCell>
                            <StyledTableCell>Semestre</StyledTableCell>
                            <StyledTableCell>Tipo</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arquivos.map((arquivo) => (
                            <StyledTableRow key={arquivo.id} onClick={handleTableRowClick}>
                                <TableCell>{arquivo.nomeArquivo}</TableCell>
                                <TableCell>{arquivo.materia}</TableCell>
                                <TableCell>{arquivo.professor}</TableCell>
                                <TableCell>{arquivo.semestre}</TableCell>
                                <TableCell>{arquivo.tipo}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className='text-right mb-1'>
                <Button
                    variant="contained"
                    onClick={() => setIsModalOpen(true)}
                    className='col-md-2'
                    style={{ backgroundColor: '#7988b7', color: 'white' }}
                >
                    Upload de Arquivo
                </Button>
            </div>

            <ModalUploadArquivo
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUploadFile}
            />
        </div>
    );
}
