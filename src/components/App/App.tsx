import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { fetchPosts } from "../../services/postService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: () => fetchPosts(query, page),
    placeholderData: keepPreviousData,
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  const changeQuery = useDebouncedCallback((q: string) => {
    setQuery(q);
    setPage(1);
  }, 300);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
    if (selectedPost) setSelectedPost(null);
  };

  const selectPost = (post: Post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />

        {isSuccess && (
          <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={changePage} />
        )}
        <button className={css.button} onClick={toggleModal}>
          Create post
        </button>
      </header>
      {isOpen && (
        <Modal onClose={toggleModal}>
          {!selectedPost ? (
            <CreatePostForm onClose={toggleModal} />
          ) : (
            <EditPostForm post={selectedPost} onClose={toggleModal} />
          )}
        </Modal>
      )}
      {isSuccess && data.posts.length > 0 && <PostList posts={data.posts} onSelect={selectPost} />}
      {/* <Section title="About Us">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia maxime aliquid adipisci
          sit sint quidem eum quod! Officiis, eveniet numquam.
        </p>
      </Section>
      <Section title="Contact Us" supTitle="slkfj>slkjdlk">
        <form>
          <label>
            Email:
            <input type="text" />
          </label>
          <label>
            Message:
            <textarea type="text" />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </Section>
      <Section title="Advantages">
        <ul>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum architecto maxime optio
            alias facilis maiores minima recusandae voluptatibus tenetur natus!
          </li>
          <li>
            Corrupti aspernatur laudantium culpa! Itaque nesciunt saepe tempore distinctio fuga,
            tempora quisquam! Illo quis voluptate laborum velit magnam? Obcaecati, minima?
          </li>
          <li>
            Recusandae voluptates vero deleniti numquam quibusdam? Pariatur quis, quaerat dolorum
            inventore repellat eius reiciendis unde impedit, earum exercitationem possimus commodi?
          </li>
        </ul>
      </Section> */}
    </div>
  );
}

// interface SectionProps {
//   title: string;
//   supTitle?: string;
//   children: React.ReactNode;
// }

// const Section = ({ title, supTitle, children }: SectionProps) => {
//   return (
//     <section>
//       <div>
//         <h2>{title}</h2>
//         {supTitle && <p>{supTitle}</p>}
//         <hr />
//         {children}

//         <hr />
//       </div>
//     </section>
//   );
// };
