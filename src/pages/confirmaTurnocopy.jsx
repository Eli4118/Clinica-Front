import React, { useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TurnoContext } from '../context/turnoContext';
import { turnoGuardarRequest } from '../api/turno';

const ConfirmacionTurno = ({ handleConfirmar }) => {
  const { turnoData } = useContext(TurnoContext);
  const navigate = useNavigate();
  const specialties = ["Cardiología", "Pediatría", "Dermatología", "Neurología", "nuevo"];

  const handleCancelar = () => {
    navigate('/');
  };

  const handleConfirmarTurno = async () => {
    if (!turnoData || !turnoData.paciente || !turnoData.turno || !turnoData.MedPersonal) {
      alert('Datos incompletos para confirmar el turno.');
      return;
    }

    const datosConfirmados = {
      paciente: {
        Nombre: turnoData.paciente.Nombre,
        Apellido: turnoData.paciente.Apellido,
        Documento: turnoData.paciente.Documento,
        Domicilio: turnoData.paciente.Domicilio,
        Telefono: turnoData.paciente.Telefono,
        Mail: turnoData.paciente.Mail,
        FechaNacimiento: turnoData.paciente.FechaNacimiento,
        Sexo: turnoData.paciente.Sexo,
        Edad: turnoData.paciente.Edad,
        ObraSocial: turnoData.paciente.ObraSocial,
      },
      turno: {
        Fecha: turnoData.turno.Fecha,
        Horario: turnoData.turno.Horario,
        CodEstado: turnoData.turno.CodEstado,
        CodTipAtencion: turnoData.turno.CodTipAtencion,
      },
      MedPersonal: {
        CodMedPersonal: turnoData.MedPersonal.CodMedPersonal,
      }
    };

    try {
      const response = await turnoGuardarRequest(datosConfirmados);
      if (response.status === 201 && response.data.CodTurno !== 0) {
        alert('Turno confirmado , su codigo de confirmacion es: ',response.data.CodTurno);
        handleConfirmar(); 
         navigate('/');
      } else {
        alert('Error al confirmar el turno');
      }
    } catch (error) {
      console.error('Error al confirmar el turno:', error);
      alert('Hubo un error al confirmar el turno.');
    }
  };

  return (
    <Container className="registro-simple d-flex align-items-center justify-content-center vh-100">
      <Card>
        <Card.Body className="text-center">
          <h3 className="card-title">Confirmación del Turno</h3>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="servicio">Servicio</Form.Label>
              <Form.Control
                type="text"
                id="servicio"
                value={specialties[turnoData.turno.CodTipAtencion-1]} // Asumiendo que CodTipAtencion es la descripción del servicio
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="medico">Médico</Form.Label>
              <Form.Control
                type="text"
                id="medico"
                value={`${turnoData.MedPersonal.Nombre} ${turnoData.MedPersonal.Apellido}`}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fecha">Fecha de consulta</Form.Label>
              <Form.Control
                type="text"
                id="fecha"
                value={turnoData.turno.Fecha.split('T')[0]}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" onClick={handleConfirmarTurno}>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={handleCancelar}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ConfirmacionTurno;
