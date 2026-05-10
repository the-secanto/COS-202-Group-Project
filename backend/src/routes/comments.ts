import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
  likeComment,
  unlikeComment
} from "../controllers/commentsController";

const router = express.Router();

// Create comment
router.post("/", createComment);

// Get comments for a post
router.get("/:postId", getComments);

// Delete comment
router.delete("/:commentId", deleteComment);

// Like comment
router.post("/:commentId/like", likeComment);

// Unlike comment
router.post("/:commentId/unlike", unlikeComment);

export default router;