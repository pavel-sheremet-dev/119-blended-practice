import Section from "../Section/Section";
import Container from "../Container/Container";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import { useState } from "react";

export default function App() {
  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // images - App

  // 1. get query from Form
  // 2. http request
  // 3. set images to state
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
          <GalleryList images={images} />
        </Container>
      </Section>
    </>
  );
}

interface FormProps {
  onSubmit: (query: string) => void;
}

const Form = ({ onSubmit }: FormProps) => {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    onSubmit(query);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="query" />
      <button type="submit">Submit</button>
    </form>
  );
};

interface GalleryListProps {
  images: Photo[];
}

// 2. Gallery list
const GalleryList = ({ images }: GalleryListProps) => {
  return (
    <ul>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <img src={image.src.large} alt={image.alt} width={150} />
          </li>
        );
      })}
    </ul>
  );
};

// 3. Loader
//  компонент заглушка
const Loader = () => {
  return <div>Loading...</div>;
};

// викликати компоненти в App
