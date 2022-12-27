import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatUserCard } from '../'
import { fetchAllChat } from '../../api/ChatRequest'
import { useAuth } from '../../hooks/useAuth'
import { setAllChats } from '../../redux/features/chatSlice'
const Conversations = () => {
  const { Chats } = useSelector((state) => state.chat)
  const auth = useAuth()
  const dispatch = useDispatch()
  // const { data, isSuccess, refetch } = useGetAllChatQuery(auth._id)


  const getAllChat = async() => {
    try {
      const {data}= await fetchAllChat(auth._id)
      if(data) {
        dispatch(setAllChats(data))
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllChat()

  }, [])

  return (
    <div
      className='wa-scroll-area py-2'
      style={{ height: 'calc(100vh - 180px)' }}
    >
      {Chats?.length === 0 && (
        <p className='dark:text-wa-light-gray text-wa-dark-3 text-center'>
          No chats found
        </p>
      )}
      {Chats?.map((chat) => (
        <ChatUserCard key={chat._id} chat={chat} />
      ))}
    </div>
  )
}

export default Conversations
