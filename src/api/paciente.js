import axios from './axios'
export const pacienteRequest = (dni) => axios.get(`/paciente/dni${dni}`)

