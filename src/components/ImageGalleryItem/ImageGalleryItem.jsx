export const ImageGalleryItem = ({
  image: { id, webformatURL, largeImageURL },
  onClick,
}) => {
  return (
    <li className="imageGalleryItem" key={id}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={evt => onClick(largeImageURL)}
      />
    </li>
  );
};
