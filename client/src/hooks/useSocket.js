import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const useSocket = () => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io('http://localhost:8800')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return socket
}

export default useSocket
