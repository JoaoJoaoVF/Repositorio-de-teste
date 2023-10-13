
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface DetalhesDisciplinaProps {
    disciplina: Row; // Suponho que você tenha uma interface Row que define a estrutura dos dados da disciplina
    onClose: () => void;
}

const DetalhesDisciplina: React.FC<DetalhesDisciplinaProps> = ({ disciplina, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes da Disciplina</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <p className="text-black">Disciplina Ofertada: {disciplina.disciplinaOfertada}</p>
                <p className="text-black">Semestre: {disciplina.semestre}</p>
                <p className="text-black">Quantidade de Avaliações: {disciplina.quantidadeAvaliacoes}</p>
                <p className="text-black">Nota Média: {disciplina.notaMedia}</p>
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

export default DetalhesDisciplina;
