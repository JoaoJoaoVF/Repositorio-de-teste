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

interface Row {
    nomeProfessor: string;
    disciplinaOfertada: string;
    semestre: string;
    numeroAvaliacoes: number;
    quantidadeEstrelas: number;
    departamento: string;
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

export default function TabelaProfessores() {
    const [rows, setRows] = useState<Row[]>([]);
    const [initialRows, setInitialRows] = useState<Row[]>([]);

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
        key: '',
        direction: 'ascending',
    });

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
            if (key === 'semestre') {
                const semA = a.semestre.split('/').map(Number);
                const semB = b.semestre.split('/').map(Number);

                if (direction === 'ascending') {
                    if (semA[0] === semB[0]) {
                        return semA[1] - semB[1];
                    }
                    return semA[0] - semB[0];
                } else {
                    if (semA[0] === semB[0]) {
                        return semB[1] - semA[1];
                    }
                    return semB[0] - semA[0];
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
                row.disciplinaOfertada.toLowerCase().includes(query.toLowerCase()) ||
                row.semestre.toLowerCase().includes(query.toLowerCase()) ||
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
            <div className='text-right mb-1'>
                <TextField
                    className='col-md-10'
                    id="filled-basic"
                    label="Pesquise por nome, disciplina, semestre ou departamento"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <Button
                    variant="contained"
                    onClick={handleOpenFilterDialog}
                    className='col-md-2'
                >
                    Filtrar
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="tabela-professores">
                    <TableHead>
                        <TableRow>
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
                                    active={sortConfig.key === 'disciplinaOfertada'}
                                    direction={sortConfig.key === 'disciplinaOfertada' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('disciplinaOfertada')}
                                >
                                    Disciplina Ofertada
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
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortConfig.key === 'quantidadeEstrelas'}
                                    direction={sortConfig.key === 'quantidadeEstrelas' ? sortConfig.direction : 'ascending'}
                                    onClick={() => sortData('quantidadeEstrelas')}
                                >
                                    Avaliações
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsOnPage.map((row, index) => (
                            <StyledTableRow key={index}>
                                <TableCell>{row.nomeProfessor}</TableCell>
                                <TableCell>{row.disciplinaOfertada}</TableCell>
                                <TableCell>{row.semestre}</TableCell>
                                <TableCell>{row.numeroAvaliacoes}</TableCell>
                                <TableCell>{row.departamento}</TableCell>
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
            />
            <FiltroProfessores
                open={openFilterDialog}
                onClose={handleCloseFilterDialog}
                onApplyFilters={handleApplyFilters}
                onClearFilters={clearFilters}
                rows={initialRows}
            />
            <NovaAvaliacaoProfessor rows={rows} />
        </div>
    );
}
