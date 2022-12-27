import { createSlice } from '@reduxjs/toolkit'
// Get the user from localStorage
const user = JSON.parse(localStorage.getItem('lets-talk-user'))
// Get the token from localStorage
const token = JSON.parse(localStorage.getItem('lets-talk-token'))

// InitialState
const initialState = {
  user: user ? user : null,
  token: token ? token : null,
}

// Create authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
    },
    // logout reducer
    logOut: (state) => {
      localStorage.clear()
      state.user = null
      state.token = null
    },
  },
})

// Export actions and slice
export const { setUserInfo, logOut } = authSlice.actions
export default authSlice.reducer
