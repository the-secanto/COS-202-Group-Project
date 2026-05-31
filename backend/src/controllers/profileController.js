import { prisma } from '../config/db.js'
import jwt from 'jsonwebtoken'

export const getProfile = async (req, res) => {
    const { id } = req.params
    const decodedId = decodeURIComponent(id)
    const parsedId = parseInt(decodedId, 10)

    const where = Number.isNaN(parsedId)
        ? { name: { equals: decodedId, mode: 'insensitive' } }
        : { id: parsedId }

    try {
        const user = await prisma.user.findFirst({
            where,
            select: {
                id: true,
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
                    orderBy: { id: 'desc' },
                },
            },
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        let isFollowing = false;
        
        // Optional auth check to see if current user follows this profile
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.jwt;
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const currentUserId = decoded.payload?.id ?? decoded.id;
                
                const followRecord = await prisma.follow.findUnique({
                    where: {
                        followerId_followingId: {
                            followerId: currentUserId,
                            followingId: user.id
                        }
                    }
                });
                isFollowing = !!followRecord;
            } catch (err) {
                // Ignore token errors
            }
        }

        return res.status(200).json({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            stories: user._count.posts,
            followers: user._count.followers,
            following: user._count.following,
            posts: user.posts,
            isFollowing,
        })
    } catch (error) {
        console.error('Error fetching profile:', error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
};
