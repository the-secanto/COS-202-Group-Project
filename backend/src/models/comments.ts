export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  parentId: number | null;
  createdAt: Date;
}

export let comments: Comment[] = [];
export let commentIdCounter = 1;