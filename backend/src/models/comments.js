export const comments = [];

export const likes = {};

const counter = {
  id: 1
};

export const getNextCommentId = () => counter.id++;

export const commentIdCounter = counter;