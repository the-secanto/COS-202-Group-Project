import express from 'express'
import { deletePost, createPost, updatePost, getFeed, getPostById } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequests.js'
import { createPostSchema } from '../validators/postValidators.js'

const router = express.Router()

router.get('/fyp', getFeed)
router.get('/:id', getPostById)

router.use(authMiddleware)
router.post('/create', validateRequest(createPostSchema), createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router