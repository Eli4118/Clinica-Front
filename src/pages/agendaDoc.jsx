import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ListGroup, Modal } from 'react-bootstrap';

const HorariosAtencion = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [schedule, setSchedule] = useState([
    { day: 'Lunes', time: '09:00 - 12:00' },
    { day: 'Martes', time: '14:00 - 17:00' },
    // Agrega más horarios según sea necesario
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({ day: '', time: '' });

  const handleDoctorChange = (e) => {
    const doctor = e.target.value;
    setSelectedDoctor(doctor);
    // Aquí puedes agregar lógica para cargar la especialidad y horarios del doctor seleccionado
    if (doctor === 'Dr. John Doe') {
      setSpecialty('Cardiología');
      setSchedule([
        { day: 'Lunes', time: '09:00 - 12:00' },
        { day: 'Martes', time: '14:00 - 17:00' },
      ]);
    } else if (doctor === 'Dr. Jane Smith') {
      setSpecialty('Dermatología');
      setSchedule([
        { day: 'Miércoles', time: '10:00 - 13:00' },
        { day: 'Jueves', time: '15:00 - 18:00' },
      ]);
    }
  };

  const handleEdit = (scheduleItem) => {
    setCurrentSchedule(scheduleItem);
    setShowModal(true);
  };

  const handleSave = () => {
    setSchedule(schedule.map(item => item.day === currentSchedule.day ? currentSchedule : item));
    setShowModal(false);
  };

  return (
    <Container className="registro-simple d-flex flex-column align-items-center justify-content-center mt-0">
      <Row className="w-100">
        {/* Contenedor de Selección de Doctor */}
        <Col xs={12} lg={4} className="mb-3 mb-lg-0">
          <Card>
            <Card.Body className="text-center">
              <span className="text-wrapper-3">Seleccionar Doctor</span>
              <Form>
                <br />
                <Form.Group>
                  <Form.Label htmlFor="doctor" className="d-md-flex">Doctor</Form.Label>
                  <Form.Control 
                    as="select" 
                    id="doctor" 
                    value={selectedDoctor} 
                    onChange={handleDoctorChange}
                  >
                    <option value="">Selecciona un doctor</option>
                    <option value="Dr. John Doe">Dr. John Doe</option>
                    <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Contenedor de Horarios de Atención */}
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body className="text-center">
              <span className="text-wrapper-3">Horarios de Atención</span>
              <p><strong>Especialidad:</strong> {specialty}</p>
              <ListGroup className="mt-3">
                {schedule.map((item, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{item.day}: {item.time}</span>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                    >
                      Editar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para editar horario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Día</Form.Label>
              <Form.Control 
                type="text" 
                value={currentSchedule.day} 
                readOnly 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Horario</Form.Label>
              <Form.Control 
                type="text" 
                value={currentSchedule.time} 
                onChange={(e) => setCurrentSchedule({ ...currentSchedule, time: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HorariosAtencion;
