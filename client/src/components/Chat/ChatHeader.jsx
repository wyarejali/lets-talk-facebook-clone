import { IconPhoneCall, IconPoint, IconVideo } from '@tabler/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SidebarToggle } from '../'

const ChatHeader = () => {
  const { activeChatUser } = useSelector((state) => state.chat)
  const { onlineUsers } = useSelector((state) => state.app)
  const Online = onlineUsers?.filter((u) => u.userId === activeChatUser?._id)[0]
  return (
    <div className='flex justify-between items-center border-b dark:border-wa-dark-2 border-wa-gray p-[8px]'>
      <div className='flex items-center'>
        <SidebarToggle />
        {activeChatUser && (
          <div>
            <h3 className='text-md dark:text-wa-light ml-2'>
              <Link
                className='hover:text-wa-primary'
                to={`/profile/${activeChatUser.username}`}
              >
                {activeChatUser?.fullname}
              </Link>
            </h3>
            <span
              className={`${
                Online?.userId === activeChatUser._id
                  ? 'text-wa-primary'
                  : 'dark:text-wa-dark-gray/50 text-wa-dark-gray'
              } flex items-center justify-start text-xs`}
            >
              <IconPoint />{' '}
              {Online?.userId === activeChatUser._id ? 'Active' : 'Offline'}
            </span>
          </div>
        )}
      </div>
      {activeChatUser && (
        <div>
          <button className='dark:hover:bg-wa-dark-2 hover:bg-wa-light-gray p-2 rounded-md'>
            <IconVideo stroke='1' color='#01A38B' />
          </button>
          <button className='dark:hover:bg-wa-dark-2 hover:bg-wa-light-gray p-2 rounded-md'>
            <IconPhoneCall stroke='1' color='#01A38B' />
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatHeader
