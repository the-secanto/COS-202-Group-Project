import express from 'express'
import { deletePost, createPost, updatePost, getFeed } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { register, login, logout } from '../controllers/authControllers.js'
import { validateRequest } from '../middleware/validateRequests.js'
import { createPostSchema } from '../validators/postValidators.js'

const router = express.Router()
router.use(authMiddleware)

router.get('/feed', getFeed)
router.post('/feed+', validateRequest(createPostSchema), createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

//router.post('/login', login)

//router.post('/logout', logout)

export default router