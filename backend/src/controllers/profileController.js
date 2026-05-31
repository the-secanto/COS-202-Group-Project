import { prisma } from '../config/db.js'

export const getProfile = async (req, res) => {
    const { id } = req.params
    const parsedId = parseInt(id, 10)

    const where = Number.isNaN(parsedId)
        ? { name: id }
        : { id: parsedId }

    try {
        const user = await prisma.user.findFirst({
            where,
            select: {
                name: true,
                avatar: true,
                _count: {
                    select: {
                        posts: { where: { published: true } },
                        followers: true,
                        following: true,
                    },
                },
                posts: {
                    where: { published: true },
                    orderBy: { createdAt: 'desc' },
                },
            },
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        return res.status(200).json({
            name: user.name,
            avatar: user.avatar,
            stories: user._count.posts,
            followers: user._count.followers,
            following: user._count.following,
            posts: user.posts,
        })
    } catch (error) {
        console.error('Error fetching profile:', error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
};
