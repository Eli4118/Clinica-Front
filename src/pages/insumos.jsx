
import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';


const Insumos = () => {
  return (
    <Container className="d-flex align-items-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="text-center">
              <span className="text-wrapper-3">Administración de Insumos</span>
            </Card.Header>
            <Card.Body>
              <Form>
                {/* Formulario de búsqueda */}
                <Row className="justify-content-start">
                  <Col md={4}>
                    <Form.Label htmlFor="CodInsumos" className="d-md-flex">Cod.Insumo</Form.Label>
                    <Form.Control type="number" id="CodInsumos" className="w-50" />
                  </Col>
                  <Col md={4}>
                    <Form.Label htmlFor="Descripcion" className="d-md-flex">Descripción</Form.Label>
                    <Form.Control type="text" id="Descripcion" />
                  </Col>
                  <Col md={4} className="mr-auto">
                    <Button type="button" className="btn btn-primary btn-sm">Buscar</Button>
                  </Col>
                </Row>

                {/* Detalles de insumos */}
                <Row className="mt-3">
                  <Col md={4} className="pr-0">
                    <Form.Label htmlFor="CodInsumos" className="d-flex">Código</Form.Label>
                    <Form.Control type="number" id="CodInsumos" />
                  </Col>
                  <Col md={4} className="px-0">
                    <Form.Label htmlFor="Descripcion" className="d-md-flex">Descripción</Form.Label>
                    <Form.Control type="text" id="Descripcion" />
                  </Col>
                  <Col md={4} className="pl-0">
                    <Form.Label htmlFor="Cantidad" className="d-md-flex">Cantidad</Form.Label>
                    <Form.Control type="text" id="Cantidad" />
                  </Col>
                </Row>

                {/* Botones de acción */}
                <Row className="justify-content-between mt-3">
                  <Button type="submit" className="btn btn-primary">Guardar</Button>
                  <Button type="submit" className="btn btn-primary">Solicitar</Button>
                  <Button type="submit" className="btn btn-primary">Modificar</Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Insumos;
