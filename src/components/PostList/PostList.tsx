import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  onSelect: (post: Post) => void;
}

export default function PostList({ posts, onSelect }: PostListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    // mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li className={css.listItem} key={post.id}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => onSelect(post)}>
              Edit
            </button>
            <button className={css.delete} onClick={() => mutation.mutate(post.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
