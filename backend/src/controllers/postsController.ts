import { Request, Response } from "express";
import {
  posts,
  postIdCounter
} from "../models/posts";

let idCounter = postIdCounter;


// Create post
export const createPost = (
  req: Request,
  res: Response
) => {
  const {
    title,
    content,
    author
  } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  const newPost = {
    id: idCounter++,
    title,
    content,
    author,
    createdAt: new Date()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};


// Get all posts
export const getPosts = (
  req: Request,
  res: Response
) => {
  res.json(posts);
};


// Get single post
export const getPostById = (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.postId);

  const post = posts.find(
    p => p.id === postId
  );

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  res.json(post);
};


// Update post
export const updatePost = (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.postId);

  const {
    title,
    content
  } = req.body;

  const post = posts.find(
    p => p.id === postId
  );

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  if (title) {
    post.title = title;
  }

  if (content) {
    post.content = content;
  }

  post.updatedAt = new Date();

  res.json(post);
};


// Delete post
export const deletePost = (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.postId);

  const index = posts.findIndex(
    p => p.id === postId
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  posts.splice(index, 1);

  res.json({
    message: "Post deleted successfully"
  });
};