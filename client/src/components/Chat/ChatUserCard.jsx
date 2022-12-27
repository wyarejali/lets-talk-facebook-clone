import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'
import getImage from '../../lib/helper'
import { setActiveChat, startChat } from '../../redux/features/chatSlice'
import { useGetUserByIdQuery } from '../../redux/services/authApi'
import ChatsSkeleton from '../../skeletons/ChatsSkeleton'

const ChatUserCard = ({ chat }) => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const id = chat.members.filter((id) => id !== auth._id)[0]

  const { isLoading, isError, error, data: user } = useGetUserByIdQuery(id)
  // const { data } = useGetMessagesQuery(id)
  // console.log(data)

  const { onlineUsers } = useSelector((state) => state.app)
  const { activeChatUser } = useSelector((state) => state.chat)
  const active = id === activeChatUser?._id

  const startChatHandler = () => {
    // Start Chat with the user
    dispatch(startChat(user))
    dispatch(setActiveChat(chat))
  }
  const Online = onlineUsers?.filter((u) => u.userId === id)[0]

  // Get the top chat

  if (isError) {
    return <span>Something went wrong!</span>
  }

  if (isLoading) {
    return <ChatsSkeleton />
  }

  if (!isLoading) {
    return (
      <div
        onClick={startChatHandler}
        className={`${
          active ? 'bg-wa-primary' : 'dark:bg-wa-dark-2 bg-wa-light-gray'
        } flex px-3 py-2 rounded-md border-b dark:border-wa-dark-1 border-wa-light-gray group dark:hover:bg-wa-primary hover:bg-wa-primary cursor-pointer`}
      >
        <div className='w-[38px] h-[38px]'>
          <img
            className='w-full h-full object-cover rounded-full'
            src={getImage(user?.profile_pic)}
            alt='avatar'
          />
        </div>
        <div className='flex-1 ml-2 truncate'>
          <div className='flex justify-between items-center'>
            <h2
              className={`${
                active ? 'text-wa-light' : ' dark:text-wa-light text-wa-dark-1'
              } font-medium group-hover:text-wa-light`}
            >
              {user?.fullname}
            </h2>
            {Online?.userId === user._id ? (
              <span
                className={`${
                  active ? 'text-wa-light' : ' text-wa-primary'
                } text-sm group-hover:text-wa-light`}
              >
                Active
              </span>
            ) : (
              <span
                className={`${
                  active
                    ? 'text-wa-light'
                    : ' dark:text-wa-dark-gray/30 text-wa-dark-gray'
                } text-sm group-hover:text-wa-light`}
              >
                Offline
              </span>
            )}
          </div>
          <p
            className={`${
              active
                ? 'text-wa-light-gray'
                : 'dark:text-wa-dark-gray text-wa-dark-3'
            } text-sm group-hover:text-wa-light`}
          >
            you: Last message...
          </p>
        </div>
      </div>
    )
  }
}

export default ChatUserCard
