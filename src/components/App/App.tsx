import Section from "../Section/Section";
import Container from "../Container/Container";

import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Photo | null>(null);

  const getQuery = async (query: string) => {
    setIsLoading(true);
    try {
      setIsError(false);
      const data = await getPhotos(query);
      setPhotos(data.photos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onModalOpen = (photo: Photo) => {
    setModalData(photo);
    // setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setModalData(null);
    // setIsModalOpen(false);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={getQuery} />
          {Boolean(modalData) && (
            <div onClick={onCloseModal}>{JSON.stringify(modalData?.alt)}</div>
          )}
          {isError && <Text>Something went wrong</Text>}
          <PhotosGallery photos={photos} onModalOpen={onModalOpen} />
          {isLoading && <Loader />}
        </Container>
      </Section>
    </>
  );
}
