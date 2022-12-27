import { Link } from 'react-router-dom'
import { CreatePostBox, OnlineUsers } from '../components'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const auth = useAuth()

  return (
    <div className='flex gap-6 justify-between px-6 py-5'>
      <div className='hidden lg:block flex-1 dark:bg-wa-dark-1 bg-wa-light py-2 px-3 dark:text-wa-light-gray text-wa-dark-2 rounded-md'>
        Left Part
      </div>
      <div className='max-w-[500px]'>
        <CreatePostBox />
        <div className='dark:bg-wa-dark-1 bg-wa-light py-2 px-3 dark:text-wa-light-gray text-wa-dark-2 shadow-medium relative z-10'>
        The home page is under construction. The Messenger is working only. You can 
          <Link to='/friends'>
            <span className='text-wa-secondary font-bold tracking-wider hover:text-wa-primary'>
              {' '}
              chat with exist user
            </span>
          </Link>
        </div>
      </div>

      <OnlineUsers />
    </div>
  )
}

export default Home
