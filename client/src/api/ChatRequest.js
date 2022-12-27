import axios from 'axios'

const API = axios.create({
  baseURL: 'https://lets-talk-api.cyclic.app/api/chat',
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem('lets-talk-token')
    )}`,
  },
})

export const createChat = (data) => API.post('/create', data)
export const fetchChats = (id) => API.get(`/${id}`)
export const fetchSpecificChat = (firstId, secondId) => API.get(`/find/${firstId}/${secondId}`)
export const fetchAllChat = (id) => API.get(`/${id}`)