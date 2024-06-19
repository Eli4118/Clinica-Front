import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { turnoRqiestDni, turnoRqiestid, createFacturaRequest } from '../api/turno';
const AcreditacionPaciente = () => {

  const initialState = {
    CodTurno: '',
    Documento: '',
    Nombre: '',
    Apellido: '',
    Descripcion: '',
    ObraSocial: '',
    Monto: 0,
    Total: 0,
  }

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSearch = async () => {
    let response;
    if (formData.Documento) {
      response = await turnoRqiestDni({ DNI: formData.Documento });
    } else if (formData.CodTurno) {
      response = await turnoRqiestid({ CodTurno: formData.CodTurno });
    }

    if (response) {
      const data = response.data;
      setFormData({
        ...formData,
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Documento: data.Documento,
        CodTurno: data.CodTurno,
        Descripcion: data.tipo,
        ObraSocial: data.ObraSocial,
        Monto: data.Monto,
      });
    }
  };

  useEffect(() => {
    const { Monto, ObraSocial } = formData;
    const total = ObraSocial ? Monto * 0.3 : Monto;
    setFormData((prevData) => ({
      ...prevData,
      Total: total,
    }));
  }, [formData.Monto, formData.ObraSocial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    const facturaData = {
      factura: {
        CodTurno: formData.CodTurno,
        Descripcion: formData.Descripcion,
        Fecha: today,
        Monto: formData.Total,
      }
    };
    console.log("esta es la factura",facturaData)
    try {
      await createFacturaRequest(facturaData);
      alert('Factura guardada con éxito');
      setFormData(initialState);
    } catch (error) {
      console.error('Error al guardar la factura:', error);
      alert('Error al guardar la factura');
    }
  };

  return (
    <Container className="d-flex align-items-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="text-center">
              <span className="text-wrapper-3">Acreditación del Paciente</span>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="CodTurno" className="d-md-flex">Seleccione una de las opciones</Form.Label>

                <Row className="align-items-center d-flex justify-content-around">
                  <Col md={3} className="mb-3 pr-1">
                    <Form.Label htmlFor="CodTurno" className="d-md-flex">Cod.Turno</Form.Label>
                    <Form.Control type="text" id="CodTurno" className="w-100" value={formData.CodTurno} onChange={handleInputChange} />
                  </Col>
                  <Col md={4} className="mb-3 pr-1">
                    <Form.Label htmlFor="Documento" className="d-md-flex">Documento</Form.Label>
                    <Form.Control type="number" id="Documento" className="w-100" value={formData.Documento} onChange={handleInputChange} />
                  </Col>
                  <Col md={2} className="mb-3 pl-1 mt-4 p-0">
                    <Button type="button" className="btn btn-primary btn-sm ml-0" onClick={handleSearch}>Buscar</Button>
                  </Col>
                </Row>

                {/* Información del paciente */}
                <Card className="mt-3">
                  <Card.Header className="text-center">
                    <Row className="mt-3">
                      <Col md={4} className="pr-0">
                        <Form.Label htmlFor="Nombre" className="d-flex">Nombre</Form.Label>
                        <Form.Control type="text" id="Nombre" readOnly value={formData.Nombre} />
                      </Col>
                      <Col md={4} className="px-0">
                        <Form.Label htmlFor="Apellido" className="d-md-flex">Apellido</Form.Label>
                        <Form.Control type="text" id="Apellido" readOnly value={formData.Apellido} />
                      </Col>
                      <Col md={4} className="pl-0">
                        <Form.Label htmlFor="Documento" className="d-md-flex">Documento</Form.Label>
                        <Form.Control type="number" id="Documento" className="w-100" readOnly value={formData.Documento} />
                      </Col>
                    </Row>
                  </Card.Header>
                </Card>

                {/* Detalle de factura */}
                <Container className="mt-5">
                  <Row className="mt-3">
                    <Col md={4} className="px-1">
                      <Form.Label htmlFor="Descripcion" className="d-md-flex">Descripción</Form.Label>
                      <Form.Control type="text" id="Descripcion" value={formData.Descripcion} onChange={handleInputChange} />
                    </Col>
                    <Col md={4} className="pl-1">
                      <Form.Label htmlFor="ObraSocial" className="d-md-flex">ObraSocial</Form.Label>
                      <Form.Control type="text" id="ObraSocial" className="w-100" value={formData.ObraSocial} onChange={handleInputChange} />
                    </Col>
                    <Col md={4} className="pl-1 ">
                      <Form.Label htmlFor="Monto" className="d-md-flex">Monto</Form.Label>
                      <Form.Control type="number" id="Monto" className="w-100" value={formData.Monto} onChange={handleInputChange} />
                    </Col>
                    <Col md={4} className="pl-1 mt-3">
                      <Form.Label htmlFor="Total" className="d-md-flex">Total</Form.Label>
                      <Form.Control type="number" id="Total" className="w-100" value={formData.Total} readOnly />
                    </Col>
                  </Row>
                </Container>

                {/* Botones de acción */}
                <Row className="justify-content-between mt-3">
                  <Button type="submit" className="btn btn-primary btn-sm">Guardar</Button>
                  <Button type="button" className="btn btn-primary btn-sm" onClick={() => alert('Imprimiendo')}>Imprimir</Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AcreditacionPaciente;
