import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error in API response:', error)
    toast.error(`Error: ${error?.response?.data?.message || error.message}`)
    return Promise.reject(error)
  },
)

export default api
