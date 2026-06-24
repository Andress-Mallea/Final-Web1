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
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    
    if (token) {
    
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getArtworks = async (): Promise<any[]> => {
  const response = await api.get('/api/v1/artworks'); 
  return response.data;
};
export const getTags = async (): Promise<any[]> => {
  const response = await api.get('/api/v1/tags'); 
  return response.data;
};

export interface Conversation {
  id: string;
  participant_username: string;
  participant_avatar: string;
  last_message?: string | null;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: "me" | "them";
  sender_username: string;
  body: string;
  created_at: string;
}

export const getConversations = async (): Promise<Conversation[]> => {
  const response = await api.get('/api/v1/messages/conversations');
  return response.data;
};

export const createConversation = async (participantUsername: string): Promise<Conversation> => {
  const response = await api.post('/api/v1/messages/conversations', {
    participant_username: participantUsername,
  });
  return response.data;
};

export const getConversationMessages = async (conversationId: string): Promise<ChatMessage[]> => {
  const response = await api.get(`/api/v1/messages/conversations/${conversationId}/messages`);
  return response.data;
};

export const sendConversationMessage = async (
  conversationId: string,
  body: string
): Promise<ChatMessage> => {
  const response = await api.post(
    `/api/v1/messages/conversations/${conversationId}/messages`,
    { body }
  );
  return response.data;
};

export default api;