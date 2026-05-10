import { Request, Response } from "express";
import {
  comments,
  likes,
  getNextCommentId,
  Comment
} from "../models/comments";

// Build threaded comment tree
const buildCommentTree = (commentsList: Comment[]) => {
  const commentMap = new Map();
  const roots: any[] = [];

  // Create copies with replies + likes
  commentsList.forEach((comment: Comment) => {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
      likes: likes[comment.id]?.size || 0
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
      }
    }
  });

  return roots;
};


// Create comment
export const createComment = (
  req: Request,
  res: Response
) => {
  const {
    postId,
    author,
    content,
    parentId
  } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  const newComment: Comment = {
    id: getNextCommentId(),
    postId,
    author,
    content,
    parentId: parentId || null,
    createdAt: new Date()
  };

  comments.push(newComment);

  // Initialize likes set
  likes[newComment.id] = new Set();

  res.status(201).json(newComment);
};


// Get comments for a post
export const getComments = (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.postId);

  const postComments = comments.filter(
    c => c.postId === postId
  );

  const threadedComments =
    buildCommentTree(postComments);

  res.json(threadedComments);
};


// Delete comment
export const deleteComment = (
  req: Request,
  res: Response
) => {
  const commentId = Number(req.params.commentId);

  const index = comments.findIndex(
    c => c.id === commentId
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Comment not found"
    });
  }

  comments.splice(index, 1);

  delete likes[commentId];

  res.json({
    message: "Comment deleted successfully"
  });
};


// Like comment
export const likeComment = (
  req: Request,
  res: Response
) => {
  const commentId = Number(req.params.commentId);

  const { user } = req.body;

  if (!likes[commentId]) {
    return res.status(404).json({
      error: "Comment not found"
    });
  }

  likes[commentId].add(user);

  res.json({
    likes: likes[commentId].size
  });
};


// Unlike comment
export const unlikeComment = (
  req: Request,
  res: Response
) => {
  const commentId = Number(req.params.commentId);

  const { user } = req.body;

  if (!likes[commentId]) {
    return res.status(404).json({
      error: "Comment not found"
    });
  }

  likes[commentId].delete(user);

  res.json({
    likes: likes[commentId].size
  });
};