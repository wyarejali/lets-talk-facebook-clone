import { IconSend } from '@tabler/icons';
import React, { useState } from 'react';
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../api/ChatRequest';
import { createMessage } from '../../api/messageRequest';
import { useAuth } from '../../hooks/useAuth';
import { setActiveChat, setChat } from '../../redux/features/chatSlice';

const ChatFooter = ({messages,setMessages, setIsSending}) => {
  const [inputText, setInputText] = useState('')

  const dispatch = useDispatch()
  const auth = useAuth()
  const { socket} = useSelector((state) => state.app)
  const {  activeChat, activeChatUser } = useSelector((state) => state.chat)

  // Handle submit for send the message to server
  const handleSubmit = async (e) => {
    //  e.preventDefault()
      const receiverId = activeChatUser._id
      const createMsg = {
        chatId: activeChat?._id,
        senderId: auth._id,
        message: inputText,
      }
      if (activeChat && inputText) {
      setMessages([...messages, createMsg])
        // Send the message to the socket
        socket.emit('send-message', {
          ...createMsg,
          receiverId,
          createdAt: new Date(),
        })
        // Create a new message and send it to server
        await createMessage(createMsg)
        setInputText('')
      } else {
        // if chat is not already created
        if (inputText) {
          setIsSending(true)
          setMessages([ createMsg])
          // Create chat
          const { data: chat } = await createChat({
            senderId: auth._id,
            receiverId,
          })
          if (chat) {
            const newMsg = {
              chatId: chat._id,
              senderId: auth._id,
              message: inputText,
            }
            const { data } = await createMessage(newMsg)
            dispatch(setActiveChat(chat))
            dispatch(setChat(chat))
  
            if (data) {
              setIsSending(false)
              // Send the message to the socket
              socket.emit('send-message', {
                ...newMsg,
                receiverId,
                createdAt: new Date(),
              })
            }
          }
          
        setInputText('')
        }
      }
    }

  return (
    <div className='dark:bg-wa-dark-3 bg-wa-white mb-3 flex rounded-md px-4 flex-end sticky bottom-0'>
        
    <InputEmoji
      value={inputText}
      onChange={setInputText}
      onEnter={handleSubmit}
      cleanOnEnter={true}
      placeholder='Write your message'
    />
    <button
      type='submit'
      className={`${inputText ? 'right-0': '-right-[40px] opacity-0 pointer-events-none'} relative transtion-all duration-75`}
      onClick={handleSubmit}
    >
      <IconSend stroke='1.5' className='text-wa-primary' />
    </button>
  </div>
  )
}

export default ChatFooter
