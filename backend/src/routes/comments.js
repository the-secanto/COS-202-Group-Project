import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
  likeComment,
  unlikeComment
} from "../controllers/commentsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get comments for a post (public)
router.get("/:postId", getComments);

// All other routes require authentication
router.use(authMiddleware);

// Create comment
router.post("/", createComment);

// Delete comment
router.delete("/:commentId", deleteComment);

// Like/Unlike comment
router.post("/:commentId/like", likeComment);
router.post("/:commentId/unlike", unlikeComment);

export default router;