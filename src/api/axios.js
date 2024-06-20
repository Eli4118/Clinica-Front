import axios from "axios";

const instance = axios.create({
    baseURL: `${'https://clinica-back-production.up.railway.app'}`,
    withCredentials: true
})

export default instance
