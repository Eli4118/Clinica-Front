import axios from './axios'

export const agendaRequest = (datos) => axios.post(`/AgendaDeAtencion`,datos,{
    headers: {
    'Content-Type': 'application/json'
  }
  }) 