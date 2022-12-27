import { IconX } from '@tabler/icons'
import React, { useEffect } from 'react'

const Toastify = ({ type, message, setAlert }) => {
  if (type === 'success') {
    return (
      <div
        className='inline-block px-5 py-2 text-sm text-green-700 bg-green-100 rounded dark:bg-green-200 dark:text-green-800'
        role='alert'
      >
        <span className='flex justify-between items-center'>
          <span>
            <span className='font-medium'>Success alert! </span>
            {message}
          </span>

          <IconX
            className='bg-wa-primary rounded-full p-1 ml-3 cursor-pointer text-wa-light'
            size={20}
            onClick={() => setAlert({ enable: false })}
          />
        </span>
      </div>
    )
  } else if (type === 'warning') {
    return (
      <div
        className='inline-block px-5 py-2 text-sm text-yellow-700 bg-yellow-100 rounded dark:bg-yellow-200 dark:text-yellow-800'
        role='alert'
      >
        <span className='flex justify-between items-center'>
          <span>
            <span className='font-medium'>Warning alert! </span>
            {message}
          </span>

          <IconX
            className='bg-yellow-500 rounded-full p-1 ml-3 cursor-pointer text-wa-light'
            size={20}
            onClick={() => setAlert({ enable: false })}
          />
        </span>
      </div>
    )
  } else if (type === 'danger') {
    return (
      <div
        className='inline-block px-5 py-2 text-sm text-red-700 bg-red-100 rounded dark:bg-red-200 dark:text-red-800'
        role='alert'
      >
        <span className='flex justify-between items-center'>
          <span>
            <span className='font-medium'>Danger alert! </span>
            {message}
          </span>

          <IconX
            className='bg-red-500 rounded-full p-1 ml-3 cursor-pointer text-wa-light'
            size={20}
            onClick={() => setAlert({ enable: false })}
          />
        </span>
      </div>
    )
  }
}

export default Toastify
