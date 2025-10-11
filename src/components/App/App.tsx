import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";
import { useModal } from "../../hooks/useModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, openModal, close] = useModal();
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: () => fetchPosts(query, page),
    placeholderData: keepPreviousData,
    // placeholderData: (p) => p,
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, 1000);

  const closeModal = () => {
    close();
    if (selectedPost) {
      setSelectedPost(null);
    }
  };

  const selectPost = (post: Post) => {
    setSelectedPost(post);
    close();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={changePage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create post
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          {selectedPost ? (
            <EditPostForm post={selectedPost} onClose={closeModal} />
          ) : (
            <CreatePostForm onClose={closeModal} />
          )}
        </Modal>
      )}
      {isSuccess && <PostList posts={data.posts} onSelectPost={selectPost} />}
    </div>
  );
}
