import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isChatOpen: false,
  activeChatUser: null,
  Chats: [],
  activeChat: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startChat: (state, action) => {
      state.isChatOpen = true
      state.activeChatUser = action.payload
    },
    setAllChats: (state, action) => {
      state.Chats = action.payload
    },
    setChat: (state, action) => {
      state.Chats = [...state.Chats, action.payload]
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
    },
    
    resetChat: (state) => {
      state.isChatOpen = false
      state.activeChatUser = null
      state.Chats = []
      state.activeChat = null
      state.messages = null
    },
  },
})

export const {
  startChat,
  setAllChats,
  setChat,
  setActiveChat,
  resetChat,
} = chatSlice.actions

export default chatSlice.reducer
