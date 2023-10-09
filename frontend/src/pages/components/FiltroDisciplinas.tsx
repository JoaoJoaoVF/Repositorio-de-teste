import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FiltroProfessores({
  open,
  handleClose,
  handleApplyFilters,
  clearFilters,
  rows,
}) {
  const [filterDisciplina, setFilterDisciplina] = useState('');
  const [filterNotaMaiorQue, setFilterNotaMaiorQue] = useState('');
  const [filterSemestre, setFilterSemestre] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('');
  const [filterNumeroAvaliacoesMin, setFilterNumeroAvaliacoesMin] = useState(''); // Filtro de número mínimo de avaliações
  const [filterQuantidadeEstrelasMin, setFilterQuantidadeEstrelasMin] = useState(''); // Filtro de quantidade mínima de estrelas

  const applyFilters = () => {
    let filteredRows = rows;

    if (filterDisciplina) {
      filteredRows = filteredRows.filter((row) =>
        row.disciplinaOfertada.toLowerCase().includes(filterDisciplina.toLowerCase())
      );
    }

    if (filterSemestre) {
      filteredRows = filteredRows.filter((row) =>
        row.semestre.includes(filterSemestre)
      );
    }

    if (filterDepartamento) {
      filteredRows = filteredRows.filter((row) =>
        row.departamento.toLowerCase().includes(filterDepartamento.toLowerCase())
      );
    }

    if (filterNumeroAvaliacoesMin) {
      const numAvaliacoesMin = parseInt(filterNumeroAvaliacoesMin);
      if (!isNaN(numAvaliacoesMin)) {
        filteredRows = filteredRows.filter((row) => row.numeroAvaliacoes >= numAvaliacoesMin);
      }
    }

    if (filterQuantidadeEstrelasMin) {
      const numEstrelasMin = parseFloat(filterQuantidadeEstrelasMin);
      if (!isNaN(numEstrelasMin)) {
        filteredRows = filteredRows.filter((row) => row.quantidadeEstrelas >= numEstrelasMin);
      }
    }

    handleApplyFilters(filteredRows);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Configure os filtros desejados:
        </DialogContentText>
        <TextField
          label="Filtrar por Disciplina"
          value={filterDisciplina}
          onChange={(e) => setFilterDisciplina(e.target.value)}
        />
        <TextField
          label="Filtrar por Nota Maior Que"
          value={filterNotaMaiorQue}
          onChange={(e) => setFilterNotaMaiorQue(e.target.value)}
        />
        <TextField
          label="Filtrar por Semestre"
          value={filterSemestre}
          onChange={(e) => setFilterSemestre(e.target.value)}
        />
        <TextField
          label="Filtrar por Departamento"
          value={filterDepartamento}
          onChange={(e) => setFilterDepartamento(e.target.value)}
        />
        <TextField
          label="Número Mínimo de Avaliações"
          value={filterNumeroAvaliacoesMin}
          onChange={(e) => setFilterNumeroAvaliacoesMin(e.target.value)}
        />
        <TextField
          label="Quantidade Mínima de Estrelas"
          value={filterQuantidadeEstrelasMin}
          onChange={(e) => setFilterQuantidadeEstrelasMin(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={applyFilters} variant="contained" color="primary">
          Aplicar Filtros
        </Button>
        <Button onClick={clearFilters} variant="outlined" color="secondary">
          Limpar Filtros
        </Button>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
