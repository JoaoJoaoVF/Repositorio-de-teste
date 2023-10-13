import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';

interface DetalhesAvaliacaoProps {
    disciplina: Row; // Suponho que você tenha uma interface Row que define a estrutura dos dados da disciplina
    onClose: () => void;
    onAprovar: (avaliacaoId: number) => void; // Função para aprovar a disciplina
    onReprovar: (avaliacaoId: number) => void; // Função para reprovar a disciplina
}

const DetalhesAvaliacao: React.FC<DetalhesAvaliacaoProps> = ({ disciplina, onClose, onAprovar, onReprovar }) => {
    const handleAprovar = () => {
        // Substitua 'api_url' pela URL correta da sua API
        const api_url = `http://localhost:3000/aprovar-avaliacao/${disciplina.id}`;

        fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    onAprovar(disciplina.id); // Passe o ID da avaliação para a função onAprovar
                    onClose();
                } else {
                    console.error('Erro ao aprovar avaliação:', response);
                }
            });
    };

    const handleReprovar = () => {
        // Substitua 'api_url' pela URL correta da sua API
        const api_url = `http://localhost:3000/aprovar-avaliacao/${disciplina.id}`;

        fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    onReprovar(disciplina.id); // Passe o ID da avaliação para a função onReprovar
                    onClose();
                } else {
                    console.error('Erro ao reprovar avaliação:', response);
                }
            });
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
                <Button
                    variant="contained"
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