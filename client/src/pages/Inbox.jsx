import { useSelector } from 'react-redux'
import { Chat, ChatList, ChatUserProfile } from '../components'

const Inbox = () => {
  const { isChatListOpen } = useSelector((state) => state.app)
  return (
    <div
      className={`${isChatListOpen ? 'gap-5' : ''} flex px-5 overflow-hidden`}
      style={{ height: 'calc(100vh - 70px)' }}
    >
      <ChatList />
      <Chat />
      <ChatUserProfile />
    </div>
  )
}

export default Inbox
