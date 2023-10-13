import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';

interface DetalhesAvaliacaoProps {
    disciplina: Row; // Suponho que você tenha uma interface Row que define a estrutura dos dados da disciplina
    onClose: () => void;
    onAprovar: () => void; // Função para aprovar a disciplina
    onReprovar: () => void; // Função para reprovar a disciplina
}

const DetalhesAvaliacao: React.FC<DetalhesAvaliacaoProps> = ({ disciplina, onClose, onAprovar, onReprovar }) => {
    const handleAprovar = () => {
        fetch('http://localhost:3000/avaliacao', {
            method: 'POST',
            body: JSON.stringify({ id: disciplina.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    onAprovar();
                    onClose();
                } else {
                    console.error('Erro ao aprovar disciplina:', response);
                }
            })
    };

    const handleReprovar = () => {
        fetch('http://localhost:3000/avaliacao', {
            method: 'POST',
            body: JSON.stringify({ id: disciplina.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    onReprovar();
                    onClose();
                } else {
                    console.error('Erro ao reprovar disciplina:', response);
                }
            })
    };


    return (
        <Modal show={true} centered>
            <Modal.Header closeButton onHide={onClose}>
                <Modal.Title>Detalhes da Avaliação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-black">Nome do Professor: {disciplina.nomeProfessor}</p>
                <p className="text-black">Quantidade de Avaliações: {disciplina.quantidadeAvaliacoes}</p>
                <p className="text-black">Nota: {disciplina.nota}</p>
                <p className="text-black">Departamento: {disciplina.departamento}</p>
                <p className="text-black">Comentario: {disciplina.comentario}</p>
                {/* Adicione outros detalhes conforme necessário */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={handleAprovar}>
                    Aprovar
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={handleReprovar}>
                    Reprovar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetalhesAvaliacao;
