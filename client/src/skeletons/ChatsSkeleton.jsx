import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'

const ChatsSkeleton = () => {
  const { theme } = useSelector((state) => state.app)
  return (
    <div className='flex gap-6 items-center'>
      <SkeletonTheme
        baseColor={`${theme === 'dark' ? '#1A2036' : '#EFF0F1'}`}
        highlightColor={`${theme === 'dark' ? '#1A2036' : '#ffffff'}`}
      >
        <Skeleton
          className='w-[38px] h-[38px] dark:bg-wa-dark-3 bg-wa-white mb-2'
          count={1}
          circle={true}
        />
        <div className='flex-1'>
          <div className='flex gap-3'>
            <Skeleton
              className='w-[140px] h-4 dark:bg-wa-dark-3 bg-wa-white'
              count={1}
            />
            <Skeleton
              className='w-[40px] h-2 dark:bg-wa-dark-3 bg-wa-white'
              count={1}
            />
          </div>
          <Skeleton
            className='w-[100px] h-3 dark:bg-wa-dark-3 bg-wa-white'
            count={1}
          />
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default ChatsSkeleton
