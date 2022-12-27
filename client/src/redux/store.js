import { configureStore } from '@reduxjs/toolkit'
import appReducer from './features/appSlice'
import authReducer from './features/authSlice'
import chatReducer from './features/chatSlice'
import { authApi } from './services/authApi'
import { chatApi } from './services/chatApi'
import { messageApi } from './services/messageApi'

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      chatApi.middleware,
      messageApi.middleware,
    ]),
})

export default store
