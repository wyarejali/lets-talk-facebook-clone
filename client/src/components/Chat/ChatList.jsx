import { IconCirclePlus, IconSearch } from '@tabler/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Conversations from './Conversations'

const ChatList = () => {
  const { isChatListOpen } = useSelector((state) => state.app)

  return (
    <div
      className={`${
        isChatListOpen
          ? '2xl:w-[320px] w-[270px]'
          : 'w-0 opacity-0 left-[-200px]'
      } relative transition-all duration-200 bg-light overflow-hidden px-[1px]`}
    >
      <div className='flex flex-col gap-5 mt-4'>
        <div className='flex gap-6 items-center justify-between'>
          <h3 className='text-md font-medium dark:text-wa-light text-wa-dark-1'>
            Chats
          </h3>
          <Link to='/friends'>
            <span className='dark:text-wa-light text-wa-primary opacity-70 hover:opacity-100'>
              <IconCirclePlus stroke={1.5} />
            </span>
          </Link>
        </div>
        <div className=' '>
          <div className='relative flex rounded-md shadow-sm'>
            <input
              type='text'
              name='company-website'
              id='company-website'
              className='dark:bg-wa-dark-3  dark:text-wa-light text-wa-dark-gray focus:ring-wa-primary focus:border-wa-primary flex-1 block w-full rounded-full sm:text-sm dark:border-wa-dark-3 border-wa-light-gray'
              placeholder={'Search...'}
            />
            <button className='absolute top-[7px] right-[7px] z-10 ho'>
              <IconSearch
                stroke={1}
                className='dark:text-wa-light text-wa-dark-2'
              />
            </button>
          </div>
        </div>
      </div>
      <Conversations />
    </div>
  )
}

export default ChatList
