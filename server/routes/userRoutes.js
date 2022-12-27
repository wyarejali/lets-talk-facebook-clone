import express from 'express'
import {
  deleteUser,
  getUser,
  getUserById,
  getUsers,
  login,
  signup,
  updateUser,
} from '../controllers/userRouteController.js'
import checkLogin from '../middlewares/checkLogin.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/all', getUsers)
router.get('/find/:username', getUser)
router.get('/:userId', getUserById)
router.put('/:userId', checkLogin, updateUser)
router.delete('/:userId', checkLogin, deleteUser)

export default router
