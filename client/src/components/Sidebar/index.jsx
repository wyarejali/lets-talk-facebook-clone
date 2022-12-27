import { IconSettings } from '@tabler/icons'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.png'
import NavMenu from './NavMenu'

const Sidebar = () => {
  return (
    <div className='dark:bg-wa-dark-1 bg-wa-light fixed top-0 left-0 flex flex-row gap-2'>
      <div className='flex flex-col justify-between items-center border-r dark:border-wa-dark-3 border-wa-light-gray h-[100vh] w-[70px] py-4'>
        <div className='w-10'>
          <Link to={'/'}>
            <img className='w-full cursor-pointer' src={logo} alt='logo' />
          </Link>
        </div>
        <NavMenu />
        <button className='group w-10 dark:bg-wa-dark-3 bg-wa-light-green dark:hover:bg-wa-primary p-2 rounded-full cursor-pointer'>
          <IconSettings
            stroke={1}
            className='animate-spin text-wa-primary group-hover:text-wa-primary dark:group-hover:text-wa-light '
            style={{ animationDuration: '2s' }}
          />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
