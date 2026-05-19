import express from "express";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts
} from "../controllers/postsController";

const router = express.Router();


// Create post
router.post("/", createPost);

// Search posts
router.get("/search", searchPosts);

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:postId", getPostById);

// Update post
router.put("/:postId", updatePost);

// Delete post
router.delete("/:postId", deletePost);

export default router;