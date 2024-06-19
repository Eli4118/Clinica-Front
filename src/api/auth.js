import axios from './axios'

export const loginRequest = (user) => axios.post(`/apiAuth/login`,user)

export const verifyTokenRequest = () => axios.get(`/apiAuth/verify`)