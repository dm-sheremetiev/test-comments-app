import { IComment } from "../types/Comment";

export const BASE_URL = "https://dummyjson.com/comments";

type TResponse = {
  comments: IComment[];
  limit: number;
  skip: number;
  total: number;
};

type TPostResponse = {};

// GET
export const getComments = async (limit: number): Promise<IComment[]> => {
  const response: TResponse = await fetch(
    `${BASE_URL}/?limit=5&skip=${limit === 5 ? 0 : limit + 1}`
  ).then((res) => res.json());

  return response.comments;
};

// POST
export const postComment = async (text: string) => {
  const response: IComment = await fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: text,
      postId: 3,
      userId: 5,
    }),
  }).then((res) => res.json());

  return response;
};

// DELETE
export const deleteComment = async (commentId: number) => {
  const response: IComment = await fetch(
    `https://dummyjson.com/comments/${commentId}`,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());

  return response;
};
