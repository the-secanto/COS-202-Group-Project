import { prisma } from '../config/db.js'

const Posts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { Posts }