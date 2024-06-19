import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { createMedicoPersonal } from '../api/usuario';

function CreateMedPersonal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    usuario: '',
    contraseña: '',
    domicilio: '',
    telefono: '',
    mail: '',
    codEspecialidad: '',
    esMedico: false,
    matricula: ''
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medPersonalData = {
        medicopersonal: {
        Nombre: formData.nombre,
        Apellido: formData.apellido,
        Documento: formData.documento,
        Domicilio: formData.domicilio,
        Telefono: formData.telefono,
        Mail: formData.mail,
        CodEspecialidad: parseInt(formData.codEspecialidad),
        EsMedico: formData.esMedico,
        Matricula: formData.matricula,
        Costo:2000,//traer de especialidad
        Contraseña: formData.contraseña,
        usuario: formData.usuario,
      }
    };
    try {
        const response = await createMedicoPersonal(medPersonalData);
        console.log("respuesta",response);
      if (response.status === 201) {
        alert('Registro confirmado');
        navigate('/');
      } else {
        alert('Error al confirmar');
      }
    } catch (error) {
      console.error('Error al confirmar', error);
      alert('Hubo un error al confirmar');
    }
  };

  return (
    <main className="registro-simple align-items-center">
      <Container className='my-5'>
        <Row className="justify-content-center">
          <Col md={12} className='mt-0'>
            <Card>
              <Card.Header className="text-center"><span className="text-wrapper-3">Datos del Administrativo</span></Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="nombre">Nombre</Form.Label>
                        <Form.Control type="text" id="nombre" value={formData.nombre} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="apellido">Apellido</Form.Label>
                        <Form.Control type="text" id="apellido" value={formData.apellido} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="documento">Documento</Form.Label>
                        <Form.Control type="text" id="documento" value={formData.documento} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="usuario">Usuario</Form.Label>
                        <Form.Control type="text" id="usuario" value={formData.usuario} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="contraseña">Contraseña</Form.Label>
                        <Form.Control type="password" id="contraseña" value={formData.contraseña} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="domicilio">Domicilio</Form.Label>
                        <Form.Control type="text" id="domicilio" value={formData.domicilio} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="telefono">Telefono</Form.Label>
                        <Form.Control type="text" id="telefono" value={formData.telefono} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="mail">Mail</Form.Label>
                        <Form.Control type="email" id="mail" value={formData.mail} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="codEspecialidad">CodEspecialidad</Form.Label>
                        <Form.Control type="number" id="codEspecialidad" value={formData.codEspecialidad} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          id="esMedico"
                          label="Es Medico"
                          checked={formData.esMedico}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label htmlFor="matricula">Matricula</Form.Label>
                        <Form.Control type="text" id="matricula" value={formData.matricula} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button type="submit" className="btn btn-primary btn-sm">Aceptar</Button>
                    <Button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate('/')}>Cancelar</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default CreateMedPersonal;
