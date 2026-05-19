import express from 'express'
import { deletePost, createPost, updatePost, getFeed } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { register, login, logout } from '../controllers/authControllers.js'

const router = express.Router()
router.use(authMiddleware)

router.get('/feed', getFeed)
router.get('/feed+', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

//router.post('/login', login)

//router.post('/logout', logout)

export default router