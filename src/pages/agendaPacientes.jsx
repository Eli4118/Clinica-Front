import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';
import { FaPhoneAlt, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/authContext';  // Importar el contexto de autenticación
import { agendaRequest } from '../api/agendaPacientes';

const AgendaPacientes = () => {
    const { user } = useAuth();  // Obtener el usuario del contexto de autenticación
    const [selectedDate, setSelectedDate] = useState('');
    const [patients, setPatients] = useState([]);
    const [noTurnos, setNoTurnos] = useState(false); // Estado para manejar la ausencia de turnos

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleCall = (id) => {
        const patient = patients.find(patient => patient.CodAgenda === id);
        alert(`Llamando al paciente: ${patient.PacienteNombre} ${patient.PacienteApellido}`);
        // Lógica de llamada al paciente
    };

    const handleAttend = (id) => {
        setPatients(patients.map(patient =>
            patient.CodAgenda === id ? { ...patient, attended: !patient.attended } : patient
        ));
    };

    const agendaRequestHandle = async () => {
        const medico = user.id;
        const fecha = selectedDate;

        // Construir el JSON para la petición
        const requestData = {
            medico,
            fecha
        };

        try {
            const response = await agendaRequest(requestData);
            if (response.data.length === 0) {
                setNoTurnos(true);
            } else {
                setNoTurnos(false);
            }
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching agenda:', error);
        }
    };

    return (
        <Container className="registro-simple d-flex flex-column align-items-center justify-content-center mt-0">
            <Row className="w-100">
                {/* Contenedor de Selección de Fecha */}
                <Col xs={12} lg={4} className="mb-3 mb-lg-0">
                    <Card>
                        <Card.Body className="text-center">
                            <span className="text-wrapper-3">Seleccionar Fecha</span>
                            <Form>
                                <br />
                                <Form.Group>
                                    <Form.Label htmlFor="fecha" className="d-md-flex">Fecha</Form.Label>
                                    <InputGroup>
                                        <Form.Control 
                                            type="date" 
                                            id="fecha" 
                                            value={selectedDate} 
                                            onChange={handleDateChange} 
                                        />
                                        <Button 
                                            type="button" 
                                            className="btn btn-primary mt-0 btn-sm" 
                                            onClick={agendaRequestHandle}
                                        >
                                            Buscar
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Contenedor de Lista de Pacientes */}
                <Col xs={12} lg={8}>
                    <Card>
                        <Card.Body className="text-center">
                            <span className="text-wrapper-3">Lista de Pacientes</span>
                            {noTurnos ? (
                                <p>No hay turnos disponibles para la fecha seleccionada.</p>
                            ) : (
                                <ListGroup className="mt-3">
                                    {patients.map(patient => (
                                        <ListGroup.Item 
                                            key={patient.CodAgenda} 
                                            className={`d-flex justify-content-between align-items-center ${patient.attended ? 'list-group-item-success' : ''}`}
                                            style={{ textDecoration: patient.attended ? 'line-through' : 'none' }}
                                        >
                                            <span>{`${patient.PacienteNombre} ${patient.PacienteApellido}`}</span>
                                            <div>
                                                <Button 
                                                    variant="primary" 
                                                    size="sm" 
                                                    className="mb-2"
                                                    onClick={() => handleCall(patient.CodAgenda)}
                                                >
                                                    <FaPhoneAlt />
                                                </Button>
                                                <Button 
                                                    variant="success" 
                                                    size="sm" 
                                                    onClick={() => handleAttend(patient.CodAgenda)}
                                                >
                                                    <FaCheck />
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AgendaPacientes;
