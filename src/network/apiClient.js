import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SITE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken && accessToken !== 'undefined') {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default axiosClient;