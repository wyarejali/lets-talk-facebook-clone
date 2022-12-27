import { IconDots } from '@tabler/icons'
import { ActiveUser } from './'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth'

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state.app)
  const auth = useAuth()
  return (
    <div className='dark:bg-wa-dark-1 bg-wa-light flex-[.8] py-2 px-3 dark:text-wa-light-gray text-wa-dark-2 rounded-md'>
      <div className='flex justify-between items-center mb-4 border-b dark:border-wa-dark-3 pb-2'>
        <h4 className='font-semibold'>Contacts</h4>
        <button className='dark:text-wa-light text-wa-dark-1'>
          <IconDots size={18} />
        </button>
      </div>
      {onlineUsers &&
        onlineUsers
          ?.filter((user) => user.userId !== auth._id)
          .map((user) => <ActiveUser key={user.userId} id={user.userId} />)}
    </div>
  )
}

export default OnlineUsers
