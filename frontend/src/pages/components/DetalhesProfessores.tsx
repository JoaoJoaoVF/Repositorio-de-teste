import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface DetalhesProfessoresProps {
    disciplina: Row; // Suponho que você tenha uma interface Row que define a estrutura dos dados da disciplina
    onClose: () => void;
}

const DetalhesProfessores: React.FC<DetalhesProfessoresProps> = ({ disciplina, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Professor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-black">Nome do Professor: {disciplina.nomeProfessor}</p>
                <p className="text-black">Quantidade de Avaliações: {disciplina.quantidadeAvaliacoes}</p>
                <p className="text-black">Nota Média: {disciplina.nota}</p>
                <p className="text-black">Departamento: {disciplina.departamento}</p>
                {/* Adicione outros detalhes conforme necessário */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetalhesProfessores;
