import express from 'express'
import { deletepost, createPost, deletePost } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { register, login, logout } from '../controllers/authControllers.js'

const router = express.Router()
router.use(authMiddleware)

router.get('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

//router.post('/login', login)

//router.post('/logout', logout)

export default router