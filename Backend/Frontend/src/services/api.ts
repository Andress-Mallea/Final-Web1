import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8080', 
  withCredentials: true, 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("arteria_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string): Promise<any> => {
  const response = await api.post('/api/v1/auth/login', { username, password });
  return response.data;
};


export const getArtworks = async (): Promise<any[]> => {
  const response = await api.get('/api/v1/artworks'); 
  return response.data;
};
export const getTags = async (): Promise<any[]> => {
  const response = await api.get('/api/v1/tags'); 
  return response.data;
};
export default api;