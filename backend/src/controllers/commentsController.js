import { prisma } from "../config/db.js";

// Build threaded comment tree (helper function)
const buildCommentTree = (commentsList) => {
  const commentMap = new Map();
  const roots = [];

  // Create copies with replies + likes count
  commentsList.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
      likesCount: comment.likes?.length || 0
    });
  });

  // Build parent-child relationships
  commentMap.forEach(comment => {
    if (comment.parentId === null) {
      roots.push(comment);
    } else {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      } else {
        // If parent not found (e.g. deleted but replies remain), treat as root or skip
        roots.push(comment);
      }
    }
  });

  return roots;
};

// Create comment
export const createComment = async (req, res) => {
  const {
    postId,
    content,
    parentId
  } = req.body;

  const userId = req.user.id;

  if (!postId || !content) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: userId,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: {
        author: {
          select: { name: true, avatar: true }
        }
      }
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get comments for a post
export const getComments = async (req, res) => {
  const postId = parseInt(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const postComments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: { name: true, avatar: true }
        },
        likes: true
      },
      orderBy: { createdAt: 'asc' }
    });

    const threadedComments = buildCommentTree(postComments);
    res.json(threadedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Like comment
export const likeComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const userId = req.user.id;

  try {
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId
        }
      }
    });

    if (existingLike) {
      return res.status(400).json({ error: "Already liked" });
    }

    await prisma.commentLike.create({
      data: {
        userId,
        commentId
      }
    });

    const likesCount = await prisma.commentLike.count({
      where: { commentId }
    });

    res.json({ likes: likesCount });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Unlike comment
export const unlikeComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const userId = req.user.id;

  try {
    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId
        }
      }
    });

    const likesCount = await prisma.commentLike.count({
      where: { commentId }
    });

    res.json({ likes: likesCount });
  } catch (error) {
    console.error("Error unliking comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
