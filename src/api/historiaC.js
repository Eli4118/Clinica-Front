import axios from './axios'


export const CreateHistoria = (data) => axios.post(`/Historiaclinica/save`,data,{
    headers: {
    'Content-Type': 'application/json'
  }
  }) 
export const getHistoriaDNI = (dni) => axios.post(`/Historiaclinica`,dni,{
    headers: {
    'Content-Type': 'application/json'
  }
  }) 
  