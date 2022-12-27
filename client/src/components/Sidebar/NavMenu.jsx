import { IconBrandMessenger, IconHome2, IconUsers } from '@tabler/icons'
import { NavLink } from 'react-router-dom'

const menuMockData = [
  {
    label: 'Home',
    icon: IconHome2,
    url: '/',
  },
  {
    label: 'Inbox',
    icon: IconBrandMessenger,
    url: '/inbox',
  },
  {
    label: 'Friends',
    icon: IconUsers,
    url: '/friends',
  },
]

const NavMenu = () => {
  return (
    <ul className='w-full flex flex-col gap-1' id='nav-menu'>
      {menuMockData.map((menu, index) => (
        <li key={menu.label + index}>
          <NavLink
            data-tooltip={menu.label}
            to={menu.url}
            className={`relative group border-r-4 border-transparent hover:border-wa-primary transition-all duration-200 dark:hover:bg-wa-dark-3 hover:bg-wa-light-gray-green cursor-pointer py-[10px] flex justify-center`}
          >
            <menu.icon
              stroke={1.5}
              className={`dark:text-wa-light-gray text-wa-primary group-hover:text-wa-primary`}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
