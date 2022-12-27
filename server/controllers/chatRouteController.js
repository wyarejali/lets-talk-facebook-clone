import ChatSchema from '../models/chatSchema.js'

// Create a new chat
export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body

  try {
    const existsChat = await ChatSchema.findOne({
      members: [senderId, receiverId],
    })
    const existsChat2 = await ChatSchema.findOne({
      members: [receiverId, senderId],
    })

    if (existsChat) {
      res.status(200).json(existsChat)
    } else if (existsChat2) {
      res.status(200).json(existsChat2)
    } else {
      if (!existsChat && !existsChat2) {
        const newChat = new ChatSchema({
          members: [senderId, receiverId],
        })
        const result = await newChat.save()
        res.status(201).json(result)
      } else {
        res.status(200).json(existsChat)
      }
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

// Find all Chat
export const userChats = async (req, res) => {
  const id = req.params.userId
  try {
    const chats = await ChatSchema.find({
      members: id,
    })
    let allIds = []
    const allChats = chats.map((chat) => {
      const ids = chat.members.filter((member) => member !== id)
      return ids
    })
    res.status(200).json(allChats)
  } catch (error) {
    res.status(500).json(error)
  }
}

// Find specific chat
export const findChat = async (req, res) => {
  try {
    const chat = await ChatSchema.findOne({
      members: [req.params.firstId, req.params.secondId],
    })
    const chat2 = await ChatSchema.findOne({
      members: [req.params.secondId, req.params.firstId],
    })
    if (chat || chat2) {
      res.status(200).json(chat || chat2)
    } else {
      res.status(404).json(null)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
