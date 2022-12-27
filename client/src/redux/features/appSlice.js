import { createSlice } from '@reduxjs/toolkit'

const getDeviceTheme = () => {
  let darkMode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode = 'dark'
  } else {
    darkMode = 'light'
  }

  return darkMode
}

const isMobile = () => {
  const size = window.screen.width
  if (size <= 768) {
    return false
  }
  return true
}

const initialState = {
  theme: getDeviceTheme(),
  isChatListOpen: isMobile(),
  socket: null,
  onlineUsers: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchTheme: (state) => {
      if (state.theme === 'dark') {
        state.theme = 'light'
      } else {
        state.theme = 'dark'
      }
    },
    toggleChatList: (state) => {
      state.isChatListOpen = !state.isChatListOpen
    },
    setSoket: (state, action) => {
      state.socket = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
    resetApp: (state) => {
      state.socket = null
      state.onlineUsers = null
    },
  },
})

export const {
  switchTheme,
  toggleChatList,
  setSoket,
  setOnlineUsers,
  resetApp,
} = appSlice.actions

export default appSlice.reducer
