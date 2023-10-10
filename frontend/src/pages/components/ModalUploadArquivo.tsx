import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';

interface ModalUploadArquivoProps {
    open: boolean;
    onClose: () => void;
    onUpload: (file: File, materia: string, professor: string, semestre: string, tipo: string) => void;
}

const ModalUploadArquivo: React.FC<ModalUploadArquivoProps> = ({ open, onClose, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [materia, setMateria] = useState('');
    const [professor, setProfessor] = useState('');
    const [semestre, setSemestre] = useState('');
    const [tipo, setTipo] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile && materia && professor && semestre && tipo) {
            onUpload(selectedFile, materia, professor, semestre, tipo);
            setSelectedFile(null);
            setMateria('');
            setProfessor('');
            setSemestre('');
            setTipo('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="modal-dialog-title">
            <DialogTitle id="modal-dialog-title">Upload de Arquivo</DialogTitle>
            <DialogContent className='container-fluid'>
                <Input
                    type="text"
                    placeholder="Matéria"
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Professor"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Semestre"
                    value={semestre}
                    onChange={(e) => setSemestre(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Tipo (Lista, Prova, Slide)"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <Input
                    type="file"
                    id="fileInput"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || !materia || !professor || !semestre || !tipo}
                    variant="contained"
                    style={{ backgroundColor: '#7988b7', color: 'white' }}
                >
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalUploadArquivo;
