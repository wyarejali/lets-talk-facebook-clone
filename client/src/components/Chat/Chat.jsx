import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ChatFooter, ChatHeader, Messenger } from '../'
import { getMessages } from '../../api/messageRequest'

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState(null)
  const [recievedMessage, setRecievedMessage] = useState(null)

  const { isChatListOpen, socket } = useSelector((state) => state.app)
  const {  activeChat, activeChatUser } = useSelector((state) => state.chat)

    // Fetch existing messages
    useEffect(() => {
      const fetchExistingMessages = async (id) => {
        setIsLoading(true)
        const { data } = await getMessages(id)
        if (data) {
          setIsLoading(false)
          setMessages(data)
        }
      }
      if (activeChat) {
        fetchExistingMessages(activeChat._id)
      // Received message from socket
        if(socket) {
          socket.on('recieve-message', (data) => {
            setRecievedMessage(data)
          })
        }
      }
    }, [activeChat])

    useEffect(()=> {
      if(recievedMessage && recievedMessage?.chatId === activeChat?._id) {
        setMessages([...messages, recievedMessage])
      }
    }, [recievedMessage])

  return (
    <div
      className={`${
        !isChatListOpen ? 'mr-5' : ''
      } flex-1 flex flex-col dark:bg-wa-dark-3 bg-wa-white my-3 rounded-xl`}
    >
      <ChatHeader />
      <Messenger messages={messages} isLoading={isLoading} isSending={isSending} />
      {activeChatUser && <ChatFooter messages={messages} setMessages={setMessages} setIsSending={setIsSending} />}
    </div>
  )
}

export default Chat
