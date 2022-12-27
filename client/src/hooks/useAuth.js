import { useDispatch, useSelector } from 'react-redux'
import { isExpired } from 'react-jwt'
import { logOut } from '../redux/features/authSlice'
import { resetApp } from '../redux/features/appSlice'
import { resetChat } from '../redux/features/chatSlice'
export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const isMyTokenExpired = isExpired(token)
  if (isMyTokenExpired) {
    dispatch(logOut())
    dispatch(resetApp())
    dispatch(resetChat())
  } else {
    return user
  }
}
