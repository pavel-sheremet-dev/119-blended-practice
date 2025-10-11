import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

import Modal from "../Modal/Modal";

import { useModal } from "../../hooks/useModal";

interface PostListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export default function PostList({ posts, onSelectPost }: PostListProps) {
  const [isOpen, open, close] = useModal();

  const queryClient = useQueryClient();

  const mutaion = useMutation({
    mutationKey: ["post"],
    mutationFn: deletePost,
    // mutationFn: (id: Post["id"]) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <>
      <ul className={css.list}>
        {posts.map((post) => (
          <li className={css.listItem} key={post.id}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.content}>{post.body}</p>
            <div className={css.footer}>
              <button className={css.edit} onClick={() => onSelectPost(post)}>
                Edit
              </button>
              <button className={css.delete} onClick={() => mutaion.mutate(post.id)}>
                Delete
              </button>
              <button onClick={open}>Show Details</button>
            </div>
          </li>
        ))}
      </ul>
      {isOpen && <Modal onClose={close}>Details INFO</Modal>}
    </>
  );
}
