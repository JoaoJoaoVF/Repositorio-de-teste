import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FiltroProfessores({
  open,
  onClose, // Renomeie handleClose para onClose
  onApplyFilters, // Renomeie handleApplyFilters para onApplyFilters
  onClearFilters,
  rows,
}) {
  const [filterDisciplina, setFilterDisciplina] = useState('');
  const [filterNotaMaiorQue, setFilterNotaMaiorQue] = useState('');
  const [filterSemestre, setFilterSemestre] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('');
  const [filterNumeroAvaliacoesMin, setFilterNumeroAvaliacoesMin] = useState('');

  const applyFilters = () => {
    let filteredRows = rows;

    if (filterDisciplina) {
      filteredRows = filteredRows.filter((row) =>
        row.nomeProfessor.toLowerCase().includes(filterDisciplina.toLowerCase()) // Atualize para o campo correto
      );
    }

    if (filterNotaMaiorQue) {
      const notaMaiorQue = parseFloat(filterNotaMaiorQue);
      if (!isNaN(notaMaiorQue)) {
        filteredRows = filteredRows.filter((row) => row.nota > notaMaiorQue);
      }
    }

    if (filterSemestre) {
      filteredRows = filteredRows.filter((row) =>
        row.departamento.toLowerCase().includes(filterSemestre.toLowerCase()) // Atualize para o campo correto
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
        filteredRows = filteredRows.filter((row) => row.quantidadeAvaliacoes >= numAvaliacoesMin);
      }
    }

    onApplyFilters(filteredRows); // Chame a função passada por propriedade
  };

  return (
    <Dialog open={open} onClose={onClose}> {/* Use onClose em vez de handleClose */}
      <DialogContent>
        <DialogContentText>
          Filtrar por:
        </DialogContentText>
        <TextField
          label="Nome do Professor"
          value={filterDisciplina}
          onChange={(e) => setFilterDisciplina(e.target.value)}
        />
        <TextField
          label="Nota Maior Que"
          value={filterNotaMaiorQue}
          onChange={(e) => setFilterNotaMaiorQue(e.target.value)}
        />
        <TextField
          label="Departamento"
          value={filterDepartamento}
          onChange={(e) => setFilterDepartamento(e.target.value)}
        />
        <TextField
          label="Mínimo de Avaliações"
          value={filterNumeroAvaliacoesMin}
          onChange={(e) => setFilterNumeroAvaliacoesMin(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={applyFilters} variant="contained" color="primary">
          Aplicar Filtros
        </Button>
        <Button onClick={onClearFilters} variant="outlined" color="secondary">
          Limpar Filtros
        </Button>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
