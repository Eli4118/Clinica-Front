import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import {createAdminRequest} from  '../api/usuario'

function CreateAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    usuario: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const adminData = {
      administrativo: {
        int: 1, 
        Nombre: formData.nombre,
        Apellido: formData.apellido,
        Documento: formData.documento,
        Contraseña: formData.contraseña,
        usuario: formData.usuario
      }
    };

    try {
        const response = await createAdminRequest(adminData);
        if (response.status === 201 && response.data.CodTurno !== 0) {
          alert('Registro confirmado');
          handleConfirmar(); 
           navigate('/');
        } else {
          alert('Error al confirmar ');
        }
      } catch (error) {
        console.error('Error al confirmar ', error);
        alert('Hubo un error al confirmar ');
      }


  };

  return (
    <main className="registro-simple align-items-center ">
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

export default CreateAdmin;
