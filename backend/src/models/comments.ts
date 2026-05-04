export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: Date;
}

export let comments: Comment[] = [];
export let commentIdCounter = 1;