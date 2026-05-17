export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export const posts: Post[] = [];

export let postIdCounter = 1;