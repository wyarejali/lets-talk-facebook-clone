import express from 'express'
import {
  createMessage,
  getMessages,
} from '../controllers/messageRouteController.js'
import checkLogin from '../middlewares/checkLogin.js'

const router = express.Router()

router.post('/create', checkLogin, createMessage)
router.get('/:chatId', getMessages)

export default router
