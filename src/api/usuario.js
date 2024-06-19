import axios from './axios'


export const createAdminRequest = (Administrativo) => axios.post(`/administrativo`,Administrativo,{
    headers: {
    'Content-Type': 'application/json'
  }
  }) 
  

export const createMedicoPersonal = (MedicoPersonal) => axios.post(`/medico`,MedicoPersonal,{
    headers: {
    'Content-Type': 'application/json'
  }
  }) 
  
  