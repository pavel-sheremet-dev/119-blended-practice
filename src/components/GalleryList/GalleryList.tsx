import type { Photo } from "../../types/photo";

interface GalleryListProps {
  images: Photo[];
  onImageClick: (image: Photo) => void;
}

// 2. Gallery list
export const GalleryList = ({ images, onImageClick }: GalleryListProps) => {
  return (
    <ul>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <img
              src={image.src.large}
              alt={image.alt}
              width={150}
              onClick={() => onImageClick(image)}
            />
          </li>
        );
      })}
    </ul>
  );
};
