import { prisma } from '../config/db.js'

// 1. CREATE a new post
export const createPost = async (req, res) => {
    const { title, content } = req.body;
    const published = req.body.published === 'true' || req.body.published === true || false;

    // Adjust 'req.user.userId' if your DB field name inside the user model is different (e.g., req.user.id)
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." })
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published: published || false,
                authorId: userId
            }
        });

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
};

// 2. UPDATE an existing post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body

    // CHANGE: Extracting userId from req.user
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." })
        }

        // Verifying ownership using the updated variable
        if (post.authorId !== userId) {
            return res.status(403).json({ message: "Unauthorized. You don't own this post." })
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title: title !== undefined ? title : post.title,
                content: content !== undefined ? content : post.content,
                published: published !== undefined ? published : post.published
            }
        });

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

// 3. DELETE a post
export const deletePost = async (req, res) => {
    const { id } = req.params

    const userId = req.user.id

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." })
        }

        // Verifying ownership using the updated variable
        if (post.authorId !== userId) {
            return res.status(403).json({ message: "Unauthorized. You cannot delete this post." })
        }

        await prisma.post.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: "Post deleted successfully." })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
};

export const getFeed = async (req, res) => {
    try {
        const feedPosts = await prisma.post.findMany({
            where: {
                published: true // Only show posts that are public
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                        savedBy: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });

        return res.status(200).json(feedPosts)
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch feed", error: error.message })
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params
    const postId = parseInt(id)

    if (Number.isNaN(postId)) {
        return res.status(400).json({ message: 'Invalid post ID.' })
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                        savedBy: true
                    }
                }
            }
        })

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' })
        }

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch post', error: error.message })
    }
}

// Like a post
export const likePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const existingLike = await prisma.postLike.findUnique({
            where: {
                userId_postId: { userId, postId }
            }
        });

        if (existingLike) {
            return res.status(400).json({ message: "Already liked" });
        }

        await prisma.postLike.create({
            data: { userId, postId }
        });

        const likesCount = await prisma.postLike.count({
            where: { postId }
        });

        res.json({ likes: likesCount });
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error: error.message });
    }
};

// Unlike a post
export const unlikePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        await prisma.postLike.delete({
            where: {
                userId_postId: { userId, postId }
            }
        });

        const likesCount = await prisma.postLike.count({
            where: { postId }
        });

        res.json({ likes: likesCount });
    } catch (error) {
        res.status(500).json({ message: "Error unliking post", error: error.message });
    }
};

// Save a post
export const savePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const existingSave = await prisma.savedPost.findUnique({
            where: {
                userId_postId: { userId, postId }
            }
        });

        if (existingSave) {
            return res.status(400).json({ message: "Already saved" });
        }

        await prisma.savedPost.create({
            data: { userId, postId }
        });

        res.json({ message: "Post saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving post", error: error.message });
    }
};

// Unsave a post
export const unsavePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        await prisma.savedPost.delete({
            where: {
                userId_postId: { userId, postId }
            }
        });

        res.json({ message: "Post unsaved" });
    } catch (error) {
        res.status(500).json({ message: "Error unsaving post", error: error.message });
    }
};

// Get saved posts for user
export const getSavedPosts = async (req, res) => {
    const userId = req.user.id;

    try {
        const saved = await prisma.savedPost.findMany({
            where: { userId },
            include: {
                post: {
                    include: {
                        author: {
                            select: { name: true, avatar: true }
                        }
                    }
                }
            }
        });

        res.json(saved.map(s => s.post));
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved posts", error: error.message });
    }
};
