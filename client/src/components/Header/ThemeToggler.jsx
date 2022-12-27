import { IconMoon, IconSun } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../../redux/features/appSlice'

const ThemeToggler = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.app)

  return (
    <div className='flex items-center'>
      <label
        className='switch inline-block h-[28px] relative w-14 cursor-pointer'
        htmlFor='toggleTheme'
      >
        <input
          className='hidden'
          type='checkbox'
          id='toggleTheme'
          onChange={() => dispatch(switchTheme())}
          checked={theme === 'light' ? true : false}
        />
        <div className="slider dark:bg-wa-dark-3 bg-wa-dark-gray rounded-full absolute bottom-0 left-0 top-0 right-0 cursor-pointer transition-all duration-300 before:contents-[''] before:rounded-full before:bg-wa-light before:absolute before:left-[4px] before:bottom-[3px] before:transition-all before:duration-300 before:w-[22px] before:h-[22px]"></div>
        <span className='absolute text-wa-light z-10 top-[5px] left-[7px] text-sm'>
          <IconSun size={17} stroke={3} />
        </span>
        <span className='absolute text-wa-light z-10 top-[5px] right-[7px] text-sm'>
          <IconMoon size={17} stroke={1.5} />
        </span>
      </label>
    </div>
  )
}

export default ThemeToggler
