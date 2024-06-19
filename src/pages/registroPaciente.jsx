import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TurnoContext } from '../context/turnoContext';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { pacienteRequest } from '../api/paciente';
import ConfirmacionTurno from './confirmaTurnocopy';

const RegistroSimple = () => {
  const { turnoData, setTurnoData } = useContext(TurnoContext);
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const buscarPaciente = async (event) => {
    event.preventDefault();
    try {
      const response = await pacienteRequest(dni);
      if (response.data) {
        setPaciente(response.data);
        setMensaje('');
      } else {
        setPaciente(null);
        setMensaje('Paciente no está registrado.');
      }
    } catch (error) {
      console.error('Error buscando paciente:', error);
      setMensaje('Hubo un error al buscar el paciente.');
    }
  };

  const handleAceptar = (event) => {
    event.preventDefault();
    if (!turnoData.turno.Fecha) {
      alert('La fecha de nacimiento no puede estar vacía');
      navigate('/pagina-de-turno');
      return;
    }

    const datosConfirmados = {
      paciente: {
        Nombre: paciente?.Nombre || '',
        Apellido: paciente?.Apellido || '',
        Documento: dni,
        Domicilio: paciente?.Domicilio || '',
        Telefono: paciente?.Telefono || '',
        Mail: paciente?.Mail || '',
        FechaNacimiento: paciente?.FechaNacimiento || '',
        Sexo: paciente?.Sexo || '',
        Edad: paciente?.Edad || '',
        ObraSocial: paciente?.ObraSocial || '',
      },
      turno: {
        Fecha: turnoData.turno.Fecha,
        Horario: turnoData.turno.Horario,
        CodEstado: turnoData.turno.CodEstado,
        CodTipAtencion: turnoData.turno.CodTipAtencion,
        
      },
      MedPersonal: {
        CodMedPersonal: turnoData.MedPersonal.CodMedPersonal,
        Nombre: turnoData.MedPersonal.Nombre,
        Apellido: turnoData.MedPersonal.Apellido,
      }
    };
    console.log (datosConfirmados)
    setTurnoData(datosConfirmados);
    setMostrarConfirmacion(true);
  };

  const handleConfirmar = () => {
    alert('Turno confirmado');
    // Aquí puedes agregar la lógica para enviar los datos confirmados al servidor si es necesario
  };

  return (
    <main className="registro-simple d-flex align-items-center">
      {mostrarConfirmacion ? (
        <ConfirmacionTurno turnoData={turnoData} handleConfirmar={handleConfirmar} />
      ) : (
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header className="text-center"><span className="text-wrapper-3">Datos Personales</span></Card.Header>
                <Card.Body>
                  <Form onSubmit={buscarPaciente}>
                    <Row>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="documento" className='m-0'>DNI</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="documento" 
                            value={dni} 
                            onChange={handleDniChange} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Button type="submit" className="btn btn-primary btn-sm mt-4">Buscar</Button>
                      </Col>
                    </Row>
                  </Form>
                  <Form onSubmit={handleAceptar}>
                    <Row>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="nombre">Nombre</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="nombre" 
                            value={paciente?.Nombre || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Nombre: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="apellido">Apellido</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="apellido" 
                            value={paciente?.Apellido || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Apellido: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="domicilio">Domicilio</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="domicilio" 
                            value={paciente?.Domicilio || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Domicilio: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="telefono" 
                            value={paciente?.Telefono || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Telefono: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="correo">Correo</Form.Label>
                          <Form.Control 
                            type="email" 
                            id="correo" 
                            value={paciente?.Mail || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Mail: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="fecha-nacimiento">Fecha de Nac.</Form.Label>
                          <Form.Control 
                            type="date" 
                            id="fecha-nacimiento" 
                            value={paciente ? paciente.FechaNacimiento.split('T')[0] : ''} 
                            onChange={(e) => setPaciente({ ...paciente, FechaNacimiento: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="sexo">Sexo</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="sexo" 
                            value={paciente?.Sexo || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Sexo: e.target.value })}
                            maxLength="1"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="edad">Edad</Form.Label>
                          <Form.Control 
                            type="number" 
                            id="edad" 
                            value={paciente?.Edad || ''} 
                            onChange={(e) => setPaciente({ ...paciente, Edad: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label htmlFor="obra-social">Obra Social</Form.Label>
                          <Form.Control 
                            type="text" 
                            id="obra-social" 
                            value={paciente?.ObraSocial || ''} 
                            onChange={(e) => setPaciente({ ...paciente, ObraSocial: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button type="submit" className="btn btn-primary btn-sm">Aceptar</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </main>
  );
};

export default RegistroSimple;
