import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSpecificChat } from '../api/ChatRequest'
import { useAuth } from '../hooks/useAuth'
import getImage from '../lib/helper'
import {
  setActiveChat,
  startChat,
} from '../redux/features/chatSlice'
import { useGetUserByIdQuery } from '../redux/services/authApi'
import Loading from './Loading'

const ActiveUser = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, data: user } = useGetUserByIdQuery(id)

  const handleClick = async (user) => {
    setLoading(true)
    // find chat
    try {
      const { data } = await fetchSpecificChat(auth._id, user._id)
      if (data !== null) {
        setLoading(false)
        dispatch(setActiveChat(data))
        dispatch(startChat(user))
        navigate('/inbox')
      }
    } catch (error) {
      if (error.response.data === null) {
        setLoading(false)
        dispatch(startChat(user))
        dispatch(setActiveChat(null))
        navigate('/inbox')
      }
    }
  }

  if (isLoading) {
    return <h4>Loading...</h4>
  }
  return (
    <div
      onClick={() => handleClick(user)}
      key={user._id}
      className='flex items-center gap-2 dark:hover:bg-wa-dark-3 hover:bg-wa-light-gray p-2 cursor-pointer rounded'
    >
      <div className='relative w-[30px] h-[30px]'>
        <img
          className='rounded-full w-full h-full'
          src={getImage(user.profile_pic)}
          alt={user.fullname}
        />
        <span className='absolute top-0 right-0 w-[8px] h-[8px] rounded-full bg-wa-primary text-wa-primary border border-wa-white text-sm'></span>
      </div>
      <h3 className='flex items-center gap-2 '>
        {user.fullname} {loading && <Loading />}
      </h3>
    </div>
  )
}

export default ActiveUser
