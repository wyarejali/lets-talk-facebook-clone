import { useAuth } from '../hooks/useAuth'
import getImage from '../lib/helper'
import { IconMoodBoy, IconPhotoPlus } from '@tabler/icons'

const CreatePostBox = () => {
  const auth = useAuth()
  return (
    <div className='dark:bg-wa-dark-1 bg-wa-light py-2 pb-4 px-3 dark:text-wa-light-gray text-wa-dark-2 shadow-medium rounded-md relative z-10 mb-6'>
      <div className='flex gap-3 items-center py-3 border-b dark:border-wa-dark-3 border-wa-light-gray'>
        <div className='w-11 h-11'>
          <img
            className='rounded-full'
            src={getImage(auth.profile_pic)}
            alt={auth.fullname}
          />
        </div>
        <button className='flex-1 rounded-3xl py-2 px-6 dark:bg-wa-dark-3 bg-wa-light-gray text-left'>
          What's on you mind, {auth.fullname}?
        </button>
      </div>
      <div className='flex gap-4 items-center mt-2'>
        <button className='flex items-center gap-2 px-3 py-[5px] border dark:border-wa-dark-3 border-wa-light-gray rounded-3xl'>
          <IconPhotoPlus stroke={1.5} /> Photos
        </button>
        <button className='flex items-center gap-2 px-3 py-[5px] border dark:border-wa-dark-3 border-wa-light-gray rounded-3xl'>
          <IconMoodBoy stroke={1.5} /> Feelings
        </button>
      </div>
    </div>
  )
}

export default CreatePostBox
