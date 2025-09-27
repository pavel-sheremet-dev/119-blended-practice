import Section from "../Section/Section";
import Container from "../Container/Container";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { Form } from "../SearchForm/SearchForm";
import { GalleryList } from "../GalleryList/GalleryList";
import Loader from "../Loader/Loader";

export default function App() {
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<null | Photo>(null);

  // 1. get query from Form
  // 2. http request
  // 3. add images state and set images results to state
  // 4. pass images to Gallery List

  const getQuery = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const photos = await getPhotos(query);
      setImages(photos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image: Photo) => {
    setIsModalOpen(true);
    setModalData(image);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <>
      <Section>
        <Container>
          {/* FORM */}
          <Form onSubmit={getQuery} />

          {/* LOADER */}
          {isLoading && <Loader />}
          {isError && <div>Some error! Try again later</div>}

          {/* GALLERY LIST */}
          <GalleryList images={images} onImageClick={openModal} />
          {isModalOpen && modalData && (
            <Modal onClose={closeModal} data={modalData} />
          )}
        </Container>
      </Section>
    </>
  );
}
