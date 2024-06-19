import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { TurnoContext } from '../context/turnoContext';
import { especialidadRequest, medicoRequest, horariosRequest } from '../api/turno';

const TurnoComponent = () => {
  const { setTurnoData, horarios, setHorarios } = useContext(TurnoContext);
  const [especialidades, setEspecialidades] = useState([{ CodEspecialidad: 0, Descripcion: 'Seleccionar' }]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState('');
  const [selectedFecha, setSelectedFecha] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await especialidadRequest();
        const especialidadesData = response.data;

        setEspecialidades([{ CodEspecialidad: 0, Descripcion: 'Seleccionar' }, ...especialidadesData]);
      } catch (error) {
        console.error('Error fetching especialidades:', error);
      }
    };
    fetchEspecialidades();

  }, []);

  useEffect(() => {
    const fetchMedicos = async (especialidad) => {
      try {
        const response = await medicoRequest(especialidad);
        const medicosData = response.data;
        console.log('Medicos fetched:', medicosData);
        setMedicos(medicosData);
      } catch (error) {
        console.error('Error fetching medicos:', error);
      }
    };
    if (selectedEspecialidad) {
      fetchMedicos(selectedEspecialidad);
    }
  }, [selectedEspecialidad]);

  const handleEspecialidadChange = (event) => {
    setSelectedEspecialidad(event.target.value);
    setSelectedMedico('');
    setSelectedFecha('');
    setHorarios({
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: []
    });
  };

  const handleMedicoChange = (event) => {
    setSelectedMedico(event.target.value);
  };

  const handleFechaChange = (event) => {
    setSelectedFecha(event.target.value);
  };

  const fetchHorarios = async () => {
    if (selectedMedico && selectedFecha) {
      try {
        const response = await horariosRequest({
          codMedPersonal: selectedMedico,
          dia: new Date(selectedFecha).toISOString()
        });
        setHorarios(response.data);
      } catch (error) {
        console.error('Error fetching horarios:', error);
      }
    } else {
      alert('Por favor seleccione un médico y una fecha.');
    }
  };

  const handleHorarioClick = (dia, hora) => {
    const fecha = getFechaPorDia(dia);
    const horaUTC = convertToUTC(hora);
    
    // Convertir selectedMedico a número
    
    const medicoSeleccionado = medicos.find(medico => medico.CodMedPersonal == selectedMedico);

    if (medicoSeleccionado) {
      setTurnoData({
        turno: {
          Fecha: fecha,
          Horario: horaUTC,
          CodEstado: 1,
          CodTipAtencion: selectedEspecialidad,
        },
        MedPersonal: {
          CodMedPersonal: selectedMedico,
          Nombre: medicoSeleccionado.Nombre,
          Apellido: medicoSeleccionado.Apellido
        }
      });
      navigate('/registro');
    } else {
      console.error('Medico no encontrado');
    }
  };
  
  const convertToUTC = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString();
  };

  const getFechaPorDia = (dia) => {
    const dias = {
      lunes: 0,
      martes: 1,
      miercoles: 2,
      jueves: 3,
      viernes: 4
    };
    if (!selectedFecha) return '';
    const fecha = new Date(selectedFecha);
    const dayIndex = fecha.getDay();
    const diff = (dias[dia] + 7 - dayIndex) % 7;
    const newFecha = new Date(fecha);
    newFecha.setDate(fecha.getDate() + diff);
    return newFecha.toISOString().split('T')[0];
  };

  const getHoraLocal = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container className="mt-4 flex p-0">
      <Row className='p-0'>
        <Col md={3}>
          <Card className="mb-4 mx-0">
            <Card.Body>
              <Card.Title>Datos del Turno</Card.Title>
              <Form>
                <Form.Group controlId="Especialidad">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Control as="select" value={selectedEspecialidad} onChange={handleEspecialidadChange}>
                    {especialidades.map((especialidad) => (
                      <option key={especialidad.CodEspecialidad} value={especialidad.CodEspecialidad}>
                        {especialidad.Descripcion}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="Medico">
                  <Form.Label>Médico</Form.Label>
                  <Form.Control as="select" value={selectedMedico} onChange={handleMedicoChange}>
                    <option value="">Seleccionar</option>
                    {medicos.map((medico) => (
                      <option key={medico.CodMedPersonal} value={medico.CodMedPersonal}>
                        {medico.Nombre} {medico.Apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="Fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" value={selectedFecha} onChange={handleFechaChange} />
                </Form.Group>
                <Button variant="primary" onClick={fetchHorarios}>
                  Ver Horarios
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Card.Title>Turnos Disponibles</Card.Title>
              <Row className='d-flex justify-content-between'>
                {Object.keys(horarios).map((dia) => (
                  <Col key={dia} md={2} className='p-0'>
                    <h5 className="text-center text-capitalize">
                      {dia} <br /> {selectedFecha && `${getFechaPorDia(dia)}`}
                    </h5>
                    {horarios[dia].length > 0 ? (
                      horarios[dia].map((hora, index) => (
                        <Card key={index} className="mb-2">
                          <Button variant="light" className="p-2" onClick={() => handleHorarioClick(dia, hora)}>
                            {getHoraLocal(hora)}
                          </Button>
                        </Card>
                      ))
                    ) : (
                      <Alert variant="info">No hay turnos disponibles.</Alert>
                    )}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TurnoComponent;
