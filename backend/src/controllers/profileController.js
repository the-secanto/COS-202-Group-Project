import { prisma } from '../config/db.js'
import jwt from 'jsonwebtoken'

export const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { bio, location, website, avatar } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                location,
                avatar // This will be the Base64 string
            }
        });

        // Note: Currently bio and website aren't in the schema, 
        // I should probably add them or handle them differently.
        // For now let's just update what we can.

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

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
                        posts: true,
                        followers: true,
                        following: true,
                    },
                },
                posts: {
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
