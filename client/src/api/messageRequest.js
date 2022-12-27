import axios from 'axios'
const token = JSON.parse(localStorage.getItem('lets-talk-token'))
const API = axios.create({
  baseURL: 'https://lets-talk-api.cyclic.app/api/message',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const createMessage = (data) => API.post('/create', data)
export const getMessages = (id) => API.get(`/${id}`)
