import axios from "axios";
import { Post, PostFormData } from "../types/post";

const PER_PAGE = 12;

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Authorization: `Bearer TOKEN`,
  },
});

interface ResponseData {
  posts: Post[];
  totalPages: number;
}

export const fetchPosts = async (searchText: string, page: number): Promise<ResponseData> => {
  const { data, headers } = await api.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: PER_PAGE,
    },
  });

  const totalCount = Number(headers["x-total-count"]);
  return { posts: data, totalPages: Math.ceil(totalCount / PER_PAGE) };
};

export const createPost = async (newPost: PostFormData) => {
  const { data } = await api.post<Post>("/posts", newPost);
  return data;
};

export const editPost = async (id: Post["id"], values: PostFormData) => {
  const { data } = await api.patch<Post>(`/posts/${id}`, values);
  return data;
};

export const deletePost = async (postId: Post["id"]) => {
  const { data } = await api.delete<Post>(`/posts/${postId}`);
  return data;
};
