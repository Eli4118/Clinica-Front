import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, DropdownButton } from 'react-bootstrap';import CreateAdmin from '../components/createAdmin'
import CreateMedPersonal from '../components/createMedPersonal'

const RegistroUsuario = () => {

  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedRole(eventKey);
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center " >
      <DropdownButton id="dropdown-basic-button" title="Seleccionar Rol" onSelect={handleSelect}>
        <Dropdown.Item eventKey="Administrativo">Administrativo</Dropdown.Item>
        <Dropdown.Item eventKey="Medico Personal">Medico Personal</Dropdown.Item>
      </DropdownButton>

              {selectedRole === 'Administrativo' && <CreateAdmin />}
              {selectedRole === 'Medico Personal' && <CreateMedPersonal />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default RegistroUsuario;
