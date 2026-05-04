import express from "express";
import {
  createComment,
  getComments,
  deleteComment
} from "../controllers/commentsController";

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getComments);
router.delete("/:commentId", deleteComment);

export default router;