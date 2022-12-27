import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'

import Layout from '../../layout/Layout'
import { setOnlineUsers } from '../../redux/features/appSlice'

const PrivateOutlet = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const { theme, socket } = useSelector((state) => state.app)

  useEffect(() => {
    if (socket) {
      socket.emit('addNewUser', auth?._id)
      socket.on('getOnlineUser', (data) => {
        dispatch(setOnlineUsers(data))
      })
    }
  }, [socket])

  // Toggle the theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add(theme)
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add(theme)
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return auth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to='/login' />
  )
}

export default PrivateOutlet
