import axios from "axios";
import { Post, PostFormData } from "../types/post";

const PER_PAGE = 12;

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

interface FetchPostData {
  posts: Post[];
  total_pages: number;
}

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostData> => {
  const { data, headers } = await api.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: PER_PAGE,
    },
  });

  const totalPosts = Number(headers["x-total-count"]);

  const totalPages = Math.ceil(totalPosts / PER_PAGE);

  return {
    posts: data,
    total_pages: totalPages,
  };
};

export const createPost = async (newPost: PostFormData) => {
  const { data } = await api.post<Post>("/posts", newPost);

  return data;
};

export const deletePost = async (postId: Post["id"]) => {
  const { data } = await api.delete<Post>(`/posts/${postId}`);

  return data;
};

export const editPost = async (postId: Post["id"], updatedPostData: PostFormData) => {
  const { data } = await api.patch<Post>(`/posts/${postId}`, updatedPostData);

  return data;
};
