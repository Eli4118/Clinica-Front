import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL || 'clinica-back-production.up.railway.app'}`,
    withCredentials: true
})

export default instance