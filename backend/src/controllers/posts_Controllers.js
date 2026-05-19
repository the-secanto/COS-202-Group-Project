import { prisma } from '../config/db.js'

// 1. CREATE a new post
export const createPost = async (req, res) => {
    const { title, content, published } = req.body;

    // CHANGE: Extracting userId from req.user (attached by your middleware)
    // Adjust 'req.user.userId' if your DB field name inside the user model is different (e.g., req.user.id)
    const userId = req.user.id;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
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
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// 2. UPDATE an existing post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;

    // CHANGE: Extracting userId from req.user
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Verifying ownership using the updated variable
        if (post.authorId !== userId) {
            return res.status(403).json({ message: "Unauthorized. You don't own this post." });
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
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// 3. DELETE a post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    // CHANGE: Extracting userId from req.user
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Verifying ownership using the updated variable
        if (post.authorId !== userId) {
            return res.status(403).json({ message: "Unauthorized. You cannot delete this post." });
        }

        await prisma.post.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};