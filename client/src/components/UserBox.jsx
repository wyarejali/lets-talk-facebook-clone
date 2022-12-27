import { IconDotsVertical, IconTrash, IconUser } from '@tabler/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchSpecificChat } from '../api/ChatRequest'

import { useAuth } from '../hooks/useAuth'
import getImage from '../lib/helper'
import {
  setActiveChat,
  startChat,
} from '../redux/features/chatSlice'
import { Loading } from './'

const UserBox = (user) => {
  const { fullname, profilePic, _id, username } = user
  const [optionsModal, setOptionsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useAuth()

  const trigger = useRef(null)
  const dropdown = useRef(null)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !optionsModal ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setOptionsModal(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // Create chat handler
  const createChatHandler = async (user) => {
    setIsLoading(true)
    // find chat
    try {
      const { data } = await fetchSpecificChat(auth._id, user._id)
      if (data !== null) {
        setIsLoading(false)
        dispatch(setActiveChat(data))
        dispatch(startChat(user))
        navigate('/inbox')
      }
    } catch (error) {
      if (error.response.data === null) {
        setIsLoading(false)
        dispatch(startChat(user))
        dispatch(setActiveChat(null))
        navigate('/inbox')
      }
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center m-auto dark:bg-wa-dark-3 bg-wa-light shadow-medium py-8 px-3 rounded-md relative'>
      <>
        <button
          ref={trigger}
          onClick={() => {
            setOptionsModal((prev) => !prev)
          }}
          className='absolute top-3 right-2'
        >
          <IconDotsVertical
            size={20}
            className='dark:text-wa-light-gray text-wa-dark-3'
          />
        </button>
        {optionsModal && (
          <div
            ref={dropdown}
            className='flex flex-col absolute top-3 right-6 dark:bg-wa-dark-2 bg-wa-light shadow-medium rounded overflow-hidden'
          >
            <button className='dark:text-wa-light-gray text-wa-dark-3 mb-1 text-sm'>
              <span className='flex px-4 py-1 dark:hover:bg-wa-dark-1 items-center'>
                <IconUser size={16} className='mr-1' />
                <Link to={`/profile/${username}`}>Profile</Link>
              </span>
            </button>
            {auth.isAdmin && (
              <>
                <button className='dark:text-wa-light-gray text-wa-dark-3 mb-1 text-sm'>
                  <span className='flex px-4 py-1 dark:hover:bg-wa-dark-1 items-center'>
                    <IconTrash size={16} className='mr-1' />
                    Edit Profile
                  </span>
                </button>
                <button
                  onClick={() => deleteHandler(_id)}
                  className='dark:text-wa-light-gray text-wa-dark-3 mb-1 text-sm'
                >
                  <span className='flex px-4 py-1 dark:hover:bg-wa-dark-1 items-center'>
                    <IconTrash size={16} className='mr-1' /> Delete
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </>
      <img
        src={`${profilePic ? getImage(profilePic) : getImage('default.png')}`}
        alt={fullname}
        className='w-16 h-16 object-cover rounded-full '
      />
      <h4 className='dark:text-wa-light-gray text-wa-dark-3 my-2 text-md text-center'>
        {fullname}
      </h4>
      <button
        onClick={() => createChatHandler(user)}
        className='border-none hover:bg-wa-secondary bg-wa-primary px-5 py-1 rounded-3xl text-wa-light'
      >
        {isLoading ? (
          <span className='flex justify-center items-center'>
            <Loading /> Processing...
          </span>
        ) : (
          'Message'
        )}
      </button>
    </div>
  )
}

export default UserBox
