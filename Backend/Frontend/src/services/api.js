import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  withCredentials: true, 
});


export const login = async (username, password) => {
  const response = await api.post('/api/login/', { username, password });
  return response.data;
};


export const getArtworks = async () => {
  const response = await api.get('/api/artworks/');
  return response.data;
};

export default api;