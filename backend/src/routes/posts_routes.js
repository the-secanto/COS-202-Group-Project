import express from 'express'
import { Posts } from '../controllers/postsControllers.js'
import { register, login, logout } from '../controllers/authControllers.js'

const router = express.Router()

router.post('/', Posts)

router.post('/login', login)

router.post('/logout', logout)

export default router