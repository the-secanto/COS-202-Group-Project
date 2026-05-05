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

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  parentId?: number | null;
  createdAt: Date;
}

export let comments: Comment[] = [];
export let commentIdCounter = 1;