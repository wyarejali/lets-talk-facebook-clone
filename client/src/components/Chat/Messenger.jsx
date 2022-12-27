import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { Loading } from '..'
import { useAuth } from '../../hooks/useAuth'

const Messenger = ({isLoading, isSending, messages}) => {  
  // hooks
  const scrollRef = useRef()
  const auth = useAuth()
  const { isChatOpen } = useSelector((state) => state.chat)

  // Always scroll to last Message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <span className='flex-1 flex justify-center items-center text-md dark:text-wa-light-gray text-wa-dark-3'>
        <Loading /> Loading...
      </span>
    )
  }

  if (!isChatOpen) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center'>
        <h3 className='text-xl font-semibold dark:text-wa-light-gray text-wa-dark-3'>
          You haven't start chat yet
        </h3>
        <p className='dark:text-wa-light-gray tracking-wide'>
          Tab one of your friends to start
        </p>
      </div>
    )
  }
  return (
    <>
      <div className='flex-1 p-4 wa-scroll-area flex flex-col'>
        {messages?.map((message, index) => (
          <div
            ref={scrollRef}
            key={index}
            className={`flex flex-col ${
              auth._id === message?.senderId ? 'items-end' : 'items-start'
            } mb-2`}
          >
            <div
              className={`flex items-center group ${
                auth._id === message?.senderId ? 'flex-row-reverse' : ''
              }`}
            >
              <p
                className={`lg:max-w-[75%] md:max-w-[60%] max-w-[90%] flex-1 ${
                  auth._id === message?.senderId
                    ? 'bg-wa-primary text-wa-light-gray rounded-br-none'
                    : 'dark:bg-wa-dark-light bg-wa-white dark:text-wa-light text-wa-dark-3 rounded-bl-none border border-wa-light-gray dark:border-wa-dark-2'
                } py-[5px] px-3 rounded-2xl flex items-center shadow-md`}
              >
                {message?.message}
                {isSending && <Loading small={true} />}
              </p>
              <span className='text-xs mx-2 dark:text-wa-dark-gray/60 text-wa-dark-gray pointer-events-none opacity-0 group-hover:opacity-100'>
                {format(message?.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default Messenger
