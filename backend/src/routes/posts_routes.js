import express from 'express'
import { Posts, deletepost } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { register, login, logout } from '../controllers/authControllers.js'

const router = express.Router()
router.use(authMiddleware)

router.get('/', Posts)
router.delete('/:id', deletepost)

//router.post('/login', login)

//router.post('/logout', logout)

export default router