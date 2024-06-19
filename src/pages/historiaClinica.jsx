import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { getHistoriaDNI, CreateHistoria } from '../api/historiaC';
import { useAuth } from '../context/authContext';

const HistoriaClinica = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto
  const [documento, setDocumento] = useState('');
  const [historial, setHistorial] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [diagnostico, setDiagnostico] = useState(''); // Estado para el diagnóstico
  const [CodPaciente, setCodPaciente] = useState(''); // Estado para el diagnóstico

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFecha(today);
  }, []);

  const buscarDatosPaciente = async () => {
    if (!documento) {
      alert('Por favor, ingrese un DNI válido.');
      return;
    }

    try {
      const requestData = { Documento: documento };
      const response = await getHistoriaDNI(requestData);

      if (response && response.data) {
        const { Nombre, Apellido, Historias } = response.data;
        setNombre(Nombre || '');
        setApellido(Apellido || '');
        setHistorial(Historias || []);
        setCodPaciente(response.data.CodPaciente)

      }
    } catch (error) {
      console.error('Error fetching historia clinica:', error);
      alert('Hubo un error al obtener los datos del paciente.');
    }
  };

  const guardarHistoriaClinica = async () => {
    if (!diagnostico) {
      alert('Por favor, ingrese un diagnóstico.');
      return;
    }

    const nuevaHistoria = {
      CodPaciente: CodPaciente, 
      CodMedPersonal: user.id,
      Fecha: fecha,
      Diagnostico: diagnostico
    };
    try {
      const response = await CreateHistoria(nuevaHistoria);
      alert('Historia clínica guardada con éxito.');
      // Actualizar el historial con la nueva entrada si es necesario
      setHistorial([...historial, nuevaHistoria]);
    } catch (error) {
      console.error('Error saving historia clinica:', error);
      alert('Hubo un error al guardar la historia clínica.');
    }
  };

  useEffect(() => {
  }, [nombre, apellido, historial]);

  return (
    <Container className="registro-simple d-flex align-items-center justify-content-center mt-0">
      <Row className="w-100">
        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <span className="text-wrapper-3">Paciente</span>
              <Form className="text-center">
                <br />
                <Form.Group>
                  <Form.Label htmlFor="documento" className="md-flex">Documento</Form.Label>
                  <Form.Control
                    type="number"
                    id="documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                  />
                </Form.Group>
                <div className="form-group d-flex justify-content-around">
                  <Button type="button" className="btn btn-primary btn-sm" onClick={buscarDatosPaciente}>
                    Buscar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <span className="text-wrapper-3">Historia Clinica</span>
              <Form>
                <br />
                <Row>
                  <Col md={4} className="pr-0">
                    <Form.Label htmlFor="fecha" className="d-md-flex">Fecha</Form.Label>
                    <Form.Control type="date" id="fecha" readOnly className="w-100" value={fecha} />
                  </Col>
                  <Col md={4} className="px-0">
                    <Form.Label htmlFor="Nombre" className="d-flex">Nombre</Form.Label>
                    <Form.Control type="text" id="Nombre" readOnly value={nombre} />
                  </Col>
                  <Col md={4} className="pl-0">
                    <Form.Label htmlFor="Apellido" className="d-md-flex">Apellido</Form.Label>
                    <Form.Control type="text" id="Apellido" readOnly value={apellido} />
                  </Col>
                </Row>
                <br />
                <Form.Group>
                  <Form.Label className="d-md-flex">Historial Médico</Form.Label>
                  {historial.length > 0 ? (
                    historial.map((item) => (
                      <Form.Control
                        key={`${item.CodHistoria}-${item.Fecha}`}
                        type="text"
                        readOnly
                        value={`${new Date(item.Fecha).toLocaleDateString()} - ${item.Diagnostico}`}
                        className="mb-2"
                      />
                    ))
                  ) : (
                    <p>No hay historial médico disponible</p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="diagnostico" className="d-md-flex">Diagnóstico</Form.Label>
                  <Form.Control
                    type="text"
                    id="diagnostico"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                  />
                </Form.Group>
                <div className="form-group d-flex justify-content-around">
                  <Button type="button" className="btn btn-primary btn-sm" onClick={guardarHistoriaClinica}>Guardar</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HistoriaClinica;
