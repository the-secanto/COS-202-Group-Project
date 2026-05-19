import { prisma } from '../config/db.js'

const Posts = async (req, res) => {
    const { title, content, authorId } = req.body

    try {
        const posts = await prisma.Post.findMany()
        res.json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

    const createpost = await prisma.Post.create({
        data: {
            title,
            content,
            authorId
        }
    })
    res.status(201).json({
        status: "Success",
        data: {}
    })


    const deletepost = async
}


export { Posts }