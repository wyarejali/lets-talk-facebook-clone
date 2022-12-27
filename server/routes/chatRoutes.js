import express from 'express'
import {
  createChat,
  findChat,
  userChats,
} from '../controllers/chatRouteController.js'
import checkLogin from '../middlewares/checkLogin.js'

const router = express.Router()

router.post('/create', checkLogin, createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)

export default router
