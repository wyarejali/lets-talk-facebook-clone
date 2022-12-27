import { Link, useLocation } from 'react-router-dom'
import fullLogo from '../../assets/full-logo.png'

import NotificationBox from './NotificationBox'
import ThemeToggler from './ThemeToggler'
import Search from '../Search'
import UserMenu from './UserMenu'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <div
      className={`${
        pathname === '/messenger' ? 'static ' : 'sticky'
      } flex-1 top-0 z-50 flex justify-between items-center backdrop-blur-2xl dark:bg-wa-dark-1 bg-wa-light border-b dark:border-wa-dark-3 border-wa-light-gray h-[70px] py-4 px-5`}
    >
      <div className='flex-1'>
        <div className='md:w-[160px] w-[140px]'>
          <Link to='/'>
            <img src={fullLogo} alt='Lets_talk' />
          </Link>
        </div>
      </div>
      <div className='flex-1 w-72'>
        <Search placeholder='Search people' />
      </div>
      <div className='flex-1 flex justify-end items-center gap-4 relative'>
        <NotificationBox />
        <ThemeToggler />
        <UserMenu />
      </div>
    </div>
  )
}

export default Header
