const PORT = process.env.PORT || 8800

const io = require('socket.io')(PORT, {
  cors: {
    origin: ['https://wa-lets-talk.netlify.app', 'http://127.0.0.1:5173'],
  },
})

let activeUsers = []

io.on('connection', (socket) => {
  // add new User
  socket.on('addNewUser', (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id })
      console.log('New User Connected', activeUsers)
    }
    // send all active users to new user
    io.emit('getOnlineUser', activeUsers)
    console.log('active users', activeUsers)
  })

  socket.on('disconnect', () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
    console.log('active users', activeUsers)
    // send all active users to all users
    io.emit('getOnlineUser', activeUsers)
  })

  // send message to a specific user
  socket.on('send-message', (data) => {
    const { receiverId: id } = data
    const user = activeUsers.find((user) => user.userId === id)

    const { receiverId, ...message } = data
    console.log('Message: ', data)
    if (user) {
      io.to(user.socketId).emit('recieve-message', message)
    }
  })
})
