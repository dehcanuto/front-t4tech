import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `${import.meta.env.VITE_API_KEY}`
    return config
  },
  (error) => {
    Promise.reject(error)
    console.log('error api', error)
    return error.data.message
  },
)

export default api
