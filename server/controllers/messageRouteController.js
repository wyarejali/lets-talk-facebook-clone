import MessageSchema from '../models/messageSchema.js'

// Create new message
export const createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body
  const newMessage = new MessageSchema({ chatId, senderId, message })
  try {
    const result = await newMessage.save()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getMessages = async (req, res) => {
  const { chatId } = req.params
  try {
    const result = await MessageSchema.find({ chatId })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
