import React, { useEffect, useRef, useState } from 'react'
import { IconBellRinging } from '@tabler/icons'
import { Link } from 'react-router-dom'

const NotificationBox = () => {
  const [notificationModal, setNotificationModal] = useState(false)

  const trigger = useRef(null)
  const dropdown = useRef(null)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !notificationModal ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setNotificationModal(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  return (
    <>
      <button
        ref={trigger}
        onClick={() => {
          setNotificationModal((prev) => !prev)
        }}
        className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:scale-[.95] transition-all text-wa-light w-10 h-10 p-3 py-2 rounded-full relative'
      >
        <IconBellRinging stroke={1.5} width={18} />
        {/* <span className='bg-wa-secondary text-wa-light-gray rounded-full w-[19px] h-[19px] p-[2px] text-[10px] absolute -top-1 -right-1'>
          3
        </span> */}
        {/* Notification area */}
      </button>
      {notificationModal && (
        <div
          ref={dropdown}
          className='dark:bg-wa-dark-3 bg-wa-light border dark:border-wa-dark-2 rounded-md absolute top-full right-0 z-10 shadow-medium w-[300px] max-h-56 px-4 wa-scroll-area'
        >
          <h4 className='text-md text-wa-gray-2 dark:text-wa-light-gray py-2 border-b dark:border-wa-dark-2 border-wa-light-gray'>
            Notifications
          </h4>
          <div className=''>
            <span className='dark:text-wa-light-gray'>
              No nsotifications items
            </span>
          </div>
          <div className='py-2 text-center'>
            <Link to='/notifications'>
              <span className='text-md text-wa-primary hover:text-wa-secondary'>
                All Notifications
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationBox
