import express from 'express'
import { deletePost, createPost, updatePost, getFeed, getPostById, likePost, unlikePost, savePost, unsavePost, getSavedPosts } from '../controllers/posts_Controllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequests.js'
import { createPostSchema } from '../validators/postValidators.js'

const router = express.Router()

router.get('/fyp', getFeed)
router.get('/saved', authMiddleware, getSavedPosts)
router.get('/:id', getPostById)

router.use(authMiddleware)
router.post('/create', validateRequest(createPostSchema), createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

// Post interactions
router.post('/:id/like', likePost)
router.delete('/:id/like', unlikePost)
router.post('/:id/save', savePost)
router.delete('/:id/save', unsavePost)

export default router