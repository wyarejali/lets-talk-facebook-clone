import { IconSearch } from '@tabler/icons'
import React from 'react'

const Search = ({ placeholder }) => {
  return (
    <div className='hidden md:flex relative rounded-md shadow-sm'>
      <input
        type='text'
        name='company-website'
        id='company-website'
        className='dark:bg-wa-dark-3 dark:text-wa-light-gray text-wa-dark-gray focus:ring-wa-primary focus:border-wa-primary flex-1 block w-full rounded-full sm:text-sm dark:border-wa-dark-3 border-wa-light-gray'
        placeholder={placeholder}
      />
      <button className='absolute top-[7px] right-3 z-10 ho'>
        <IconSearch stroke={1} className='dark:text-wa-dark-gray text-wa-dark-3 ' />
      </button>
    </div>
  )
}

export default Search
