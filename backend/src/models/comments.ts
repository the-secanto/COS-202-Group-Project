export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  parentId: number | null;
  createdAt: Date;
}

export let comments: Comment[] = [];

export const likes: Record<number, Set<string>> = {};

const counter = { id: 1 };
export const getNextCommentId = () => counter.id++;
export const commentIdCounter = counter;