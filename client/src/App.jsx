import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateOutlet from './components/privetOutlet/PrivetOutlet'
import { useDispatch } from 'react-redux'

import io from 'socket.io-client'
import { setSoket } from './redux/features/appSlice'
import {
  EditProfile,
  Friends,
  Home,
  Inbox,
  Login,
  Notifications,
  Profile,
  Signup,
} from './pages'
import { useAuth } from './hooks/useAuth'

const App = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const socket = io('https://wa-lets-talk-socket.onrender.com')

  // Set new socket
  // Send new user to socket server
  useEffect(() => {
    if (auth) {
      dispatch(setSoket(socket))
    }
  }, [auth])

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<PrivateOutlet />}>
          <Route path='' element={<Home />} />
          <Route path='inbox' element={<Inbox />} />
          <Route path='friends' element={<Friends />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='profile/:username' element={<Profile />} />
          <Route path='profile/edit/:username' element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
