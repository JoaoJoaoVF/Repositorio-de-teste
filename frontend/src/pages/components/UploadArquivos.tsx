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
import Input from '@mui/material/Input';

interface Disciplina {
    id: number;
    nome: string;
    professor: string;
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
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        // Simule a carga de dados do backend
        const exemploDisciplinas: Disciplina[] = [
            { id: 1, nome: 'Matemática', professor: 'Professor 1' },
            { id: 2, nome: 'História', professor: 'Professor 2' },
            // Adicione mais disciplinas conforme necessário
        ];

        setDisciplinas(exemploDisciplinas);
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Aqui você pode implementar a lógica para fazer upload do arquivo para o backend
            console.log('Arquivo selecionado:', selectedFile.name);
            // Limpar o arquivo selecionado após o upload
            setSelectedFile(null);
        }
    };

    return (
        <div className='container-fluid'>
            <TableContainer component={Paper}>
                <Table aria-label="tabela-disciplinas">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nome da Disciplina</StyledTableCell>
                            <StyledTableCell>Professor</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disciplinas.map((disciplina) => (
                            <StyledTableRow key={disciplina.id}>
                                <TableCell>{disciplina.nome}</TableCell>
                                <TableCell>{disciplina.professor}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className='text-right mb-1'>
                <Input
                    type="file"
                    id="fileInput"
                    accept=".pdf, .doc, .docx" // Aceita apenas arquivos PDF, DOC e DOCX
                    onChange={handleFileChange}
                />
                <Button
                    variant="contained"
                    onClick={handleUpload}
                    className='col-md-2'
                    style={{ backgroundColor: '#7988b7', color: 'white' }} // Estilização do botão
                    disabled={!selectedFile} // Desabilita o botão se nenhum arquivo estiver selecionado
                >
                    Upload de Arquivo
                </Button>
            </div>
        </div>
    );
}
