import React, { useContext } from 'react';
import { TurnoContext } from '../context/turnoContext';
import { Container, Card, Form, Button } from 'react-bootstrap';

const ConfirmacionTurno = () => {
  const { turnoData } = useContext(TurnoContext);

  return (
  
    <Container className="registro-simple d-flex align-items-center justify-content-center vh-100">
      <Card>
        <Card.Body className="text-center">
          <h3 className="card-title">Confirmación del Turno</h3>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="servicio">Servicio</Form.Label>
              <Form.Control type="text" id="servicio" defaultValue="Medicina General" readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="medico">Médico</Form.Label>
              <Form.Control type="text" id="medico" defaultValue="Soma Renato" readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fecha">Fecha de consulta</Form.Label>
              <Form.Control type="text" id="fecha" defaultValue="03/06/2024" readOnly />
            </Form.Group>
            <Form.Group className="d-flex justify-content-around">
              <Button variant="primary">Confirmar</Button>
              <Button variant="secondary">Cancelar</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  
  );
};

export default ConfirmacionTurno;
