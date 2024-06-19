import axios from './axios'

export const especialidadRequest = () => axios.get(`/medico/especialidad`)

export const medicoRequest = (id) => axios.get(`/medico/medico${id}`)

export const horariosRequest = (peticion) => axios.post(`/turno/libre`, peticion, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const turnoGuardarRequest =  (turno) => axios.post(`/turno`, turno, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const turnoRqiestid = (CodTurno) => axios.post(`/turno/id`,CodTurno,{
  headers: {
  'Content-Type': 'application/json'
}
}) 
export const turnoRqiestDni = (DNI) => axios.post(`/turno/DNI`,DNI,{
    headers: {
    'Content-Type': 'application/json'
  }
}) 
export const createFacturaRequest = (factura) => axios.post(`/factura/`,factura,{
  headers: {
  'Content-Type': 'application/json'
}
}) 


