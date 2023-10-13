import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import TablePagination from '@mui/material/TablePagination';

import FiltroProfessores from './FiltroProfessores';
import NovaAvaliacaoProfessor from './NovaAvaliacaoProfessor';
import DetalhesAvaliacao from './DetalhesAvaliacao';

interface Row {
    nomeUsuario: string;
    nomeProfessor: string;
    nota: number;
    departamento: string;
    semestre: string;
    comentario: string;
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

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
    '& .MuiTablePagination-toolbar': {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export default function TabelaAprovacaoAvalicao() {
    const [rows, setRows] = useState<Row[]>([]);
    const [initialRows, setInitialRows] = useState<Row[]>([]);
    const [showDetails, setShowDetails] = useState<Row | null>(null);

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
        key: '',
        direction: 'ascending',
    });


    // Simule dados de exemplo
    const exemploDados: Row[] = [
        {
            nomeUsuario: 'João Silva',
            nomeProfessor: 'Luiza de Melo',
            nota: 8.5,
            departamento: 'Ciências Exatas',
            semestre: '2023/1',
            comentario: 'Ótima professora, explica muito bem e é muito atenciosa com os alunos.'
        },
        {
            nomeUsuario: 'Maria Souza',
            nomeProfessor: 'Lucas Avelar',
            nota: 7.2,
            departamento: 'Ciências Humanas',
            semestre: '2023/1',
            comentario: 'Professor muito bom, mas as aulas são um pouco cansativas.'
        },
    ];

    const handleTableRowClick = (disciplina: Row) => {
        // Abre o pop-up de detalhes quando uma linha da tabela é clicada
        setShowDetails(disciplina);
    };

    // Esqueleto para importar os dados do back
    // useEffect(() => {
    //     fetch()
    //         .then((response) => response.json())
    //         .then((data: Row[]) => {
    //             setRows(data);
    //             setInitialRows(data); 
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('Erro ao carregar os dados:', error);
    //         });
    // }, []);


    useEffect(() => {
        setRows(exemploDados);
        setInitialRows(exemploDados);
    }, []);

    const [openFilterDialog, setOpenFilterDialog] = useState(false);

    const handleOpenFilterDialog = () => {
        setOpenFilterDialog(true);
    };

    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    };

    const handleApplyFilters = (filteredRows: Row[]) => {
        setRows(filteredRows);
        handleCloseFilterDialog();
    };

    const clearFilters = () => {
        setRows(initialRows);
        handleCloseFilterDialog();
    };

    const sortData = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedRows = [...rows].sort((a, b) => {
            if (key === 'nomeProfessor') {
                if (direction === 'ascending') {
                    return a.nomeProfessor.localeCompare(b.nomeProfessor);
                } else {
                    return b.nomeProfessor.localeCompare(a.nomeProfessor);
                }
            } else if (key === 'nota') {
                if (direction === 'ascending') {
                    return a.nota - b.nota;
                } else {
                    return b.nota - a.nota;
                }
            } else if (key === 'quantidadeAvaliacoes') {
                if (direction === 'ascending') {
                    return a.quantidadeAvaliacoes - b.quantidadeAvaliacoes;
                } else {
                    return b.quantidadeAvaliacoes - a.quantidadeAvaliacoes;
                }
            } else {
                if (direction === 'ascending') {
                    return a[key] > b[key] ? 1 : -1;
                } else {
                    return a[key] < b[key] ? 1 : -1;
                }
            }
        });

        setRows(sortedRows);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filteredRows = initialRows.filter((row) => {
            return (
                row.nomeProfessor.toLowerCase().includes(query.toLowerCase()) ||
                row.departamento.toLowerCase().includes(query.toLowerCase())
            );
        });

        setRows(filteredRows);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rowsOnPage = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className='container-fluid'>
            {/* Restante do código permanece o mesmo */}
            <TableContainer component={Paper}>
                <Table aria-label="tabela-professores">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'nomeUsuario'}
                                    direction={sortConfig.key === 'nomeUsuario' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('nomeUsuario')}
                                >
                                    Nome do Usuário
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'nomeProfessor'}
                                    direction={sortConfig.key === 'nomeProfessor' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('nomeProfessor')}
                                >
                                    Nome do Professor
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'nota'}
                                    direction={sortConfig.key === 'nota' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('nota')}
                                >
                                    Nota
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'departamento'}
                                    direction={sortConfig.key === 'departamento' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('departamento')}
                                >
                                    Departamento
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'semestre'}
                                    direction={sortConfig.key === 'semestre' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('semestre')}
                                >
                                    Semestre
                                </TableSortLabel>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsOnPage.map((row, index) => (
                            <StyledTableRow key={index} onClick={() => handleTableRowClick(row)}>
                                <TableCell>{row.nomeUsuario}</TableCell>
                                <TableCell>{row.nomeProfessor}</TableCell>
                                <TableCell>{row.nota}</TableCell>
                                <TableCell>{row.departamento}</TableCell>
                                <TableCell>{row.semestre}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{backgroundColor: '#7988b7', color: 'white', display: 'flex', justifyContent: 'center'}}
            />
            <FiltroProfessores
                open={openFilterDialog}
                onClose={handleCloseFilterDialog}
                onApplyFilters={handleApplyFilters}
                onClearFilters={clearFilters}
                rows={initialRows}
            />
            {showDetails && (
                <DetalhesAvaliacao disciplina={showDetails} onClose={() => setShowDetails(null)} />
            )}
        </div>
    );
}
