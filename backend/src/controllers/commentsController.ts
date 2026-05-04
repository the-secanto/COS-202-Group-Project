import { Request, Response } from "express";
import { comments, commentIdCounter } from "../models/comments";

let idCounter = commentIdCounter;

// 🔹 Create comment
export const createComment = (req: Request, res: Response) => {
  const { postId, author, content } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newComment = {
    id: idCounter++,
    postId,
    author,
    content,
    createdAt: new Date()
  };

  comments.push(newComment);

  res.status(201).json(newComment);
};

// 🔹 Get comments for a post
export const getComments = (req: Request, res: Response) => {
  const postId = Number(req.params.postId);

  const postComments = comments.filter(c => c.postId === postId);

  res.json(postComments);
};

// 🔹 Delete comment
export const deleteComment = (req: Request, res: Response) => {
  const id = Number(req.params.commentId);

  const index = comments.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comments.splice(index, 1);

  res.json({ message: "Deleted successfully" });
};