import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onModalOpen: (photo: Photo) => void;
}

export default function PhotosGallery({
  photos,
  onModalOpen,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <GridItem key={photo.id}>
          <PhotosGalleryItem photo={photo} onModalOpen={onModalOpen} />
        </GridItem>
      ))}
    </Grid>
  );
}
