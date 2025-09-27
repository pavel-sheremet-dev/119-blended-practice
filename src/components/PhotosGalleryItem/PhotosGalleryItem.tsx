import type { Photo } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  photo: Photo;
  onModalOpen: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  photo,
  onModalOpen,
}: PhotosGalleryItemProps) {
  return (
    <div
      onClick={() => onModalOpen(photo)}
      className={styles.thumb}
      style={{
        backgroundColor: photo.avg_color,
        borderColor: photo.avg_color,
      }}
    >
      <img src={photo.src.large} alt={photo.alt} />
    </div>
  );
}
