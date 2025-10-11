// import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination currentPage={1} totalPages={5} />
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      <PostList />
    </div>
  );
}
