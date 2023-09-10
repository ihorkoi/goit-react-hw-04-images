import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="imageGallery">
      {images.map(image => {
        return <ImageGalleryItem image={image} onClick={onClick} />;
      })}
    </ul>
  );
};
