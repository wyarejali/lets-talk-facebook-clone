import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleChatList } from '../redux/features/appSlice'

const SidebarToggle = () => {
  const { isChatListOpen } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  return (
    <>
      {isChatListOpen ? (
        <button
          className='hover:dark:bg-wa-dark-2 hover:bg-wa-gray p-2 rounded-md dark:text-wa-light text-wa-dark-1'
          onClick={() => dispatch(toggleChatList())}
        >
          <IconArrowNarrowLeft stroke={1} />
        </button>
      ) : (
        <button
          className='hover:dark:bg-wa-dark-2 hover:bg-wa-gray p-2 rounded-md dark:text-wa-light text-wa-dark-1'
          onClick={() => dispatch(toggleChatList())}
        >
          <IconArrowNarrowRight stroke={1} />
        </button>
      )}
    </>
  )
}

export default SidebarToggle
