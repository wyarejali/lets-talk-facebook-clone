import React, { useEffect, useRef, useState } from 'react'
import { IconAddressBook, IconEdit, IconLogout } from '@tabler/icons'
import { useAuth } from '../../hooks/useAuth'
import getImage from '../../lib/helper'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/features/authSlice'
import { resetApp } from '../../redux/features/appSlice'
import { resetChat } from '../../redux/features/chatSlice'

const UserMenu = () => {
  const [profileModal, setProfileModal] = useState(false)
  const dispatch = useDispatch()
  const trigger = useRef(null)
  const dropdown = useRef(null)
  const auth = useAuth()

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !profileModal ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setProfileModal(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  const signOut = () => {
    setProfileModal(false)
    dispatch(logOut())
    dispatch(resetApp())
    dispatch(resetChat())
    location.reload()
  }

  return (
    <div className='relative flex items-center'>
      <button
        ref={trigger}
        onClick={() => setProfileModal((prev) => !prev)}
        className='w-10 h-10 rounded-full overflow-hidden'
      >
        <img
          className='object-cover w-full h-full'
          src={`${getImage(auth.profile_pic)}`}
          alt={auth?.fullname}
        />
      </button>
      {profileModal && (
        <div
          ref={dropdown}
          className='absolute right-0 top-full dark:bg-wa-dark-3 bg-wa-light shadow-medium rounded-md overflow-hidden min-w-[150px]'
        >
          <Link
            to={`/profile/${auth.username}`}
            onClick={() => setProfileModal(false)}
          >
            <span className='flex items-center gap-2 dark:text-wa-light-gray dark:hover:bg-wa-dark-2 hover:bg-wa-light-gray px-3 py-2 cursor-pointer border-b dark:border-wa-dark-2 border-wa-light-gray'>
              <IconAddressBook size={21} stroke={1.5} /> Profile
            </span>
          </Link>
          <Link
            to={`/profile/edit/${auth.username}`}
            onClick={() => setProfileModal(false)}
          >
            <span className='flex items-center gap-2 dark:text-wa-light-gray dark:hover:bg-wa-dark-2 hover:bg-wa-light-gray px-3 py-2 cursor-pointer border-b dark:border-wa-dark-2 border-wa-light-gray'>
              <IconEdit size={21} stroke={1.5} /> Edit Profile
            </span>
          </Link>
          <span
            onClick={signOut}
            className='flex items-center gap-2 dark:text-wa-light-gray dark:hover:bg-wa-dark-2 hover:bg-wa-light-gray px-3 py-2 cursor-pointer'
          >
            <IconLogout size={21} stroke={1.5} /> Logout
          </span>
        </div>
      )}
    </div>
  )
}

export default UserMenu
