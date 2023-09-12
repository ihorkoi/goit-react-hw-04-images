import { Searchbar } from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { ModalWindow } from './Modal/Modal';

import { fetchQuery } from './API';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [openedImg, setOpenedImg] = useState('');

  function getQuery(newQuery) {
    if (newQuery.trim() !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }
  }

  useEffect(() => {
    if (!query) {
      return;
    }
    function updateImgState() {
      setIsLoading(true);
      fetchQuery(page, query)
        .then(data => {
          if (data.hits.length === 0) {
            Notiflix.Notify.failure(
              "Sorry, we couldn't find any matches for your query"
            );
            return;
          }
          setImages(prevState => [...prevState, ...data.hits]);
          setLoadMore(page < Math.ceil(data.totalHits / 12));
        })
        .catch(err => {
          Notiflix.Notify.failure(
            'Something went wrong, please try again later'
          );
        })
        .finally(() => setIsLoading(false));
    }
    updateImgState();
  }, [page, query]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const onImageClick = img => {
    setShowModal(true);
    setOpenedImg(img);
  };
  const onImageClose = () => {
    setShowModal(false);
    setOpenedImg('');
  };
  return (
    <div className="app">
      <ModalWindow
        props={{ showModal, openedImg }}
        onImageClose={onImageClose}
      />
      <Searchbar onSubmit={getQuery} />

      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onClick={onImageClick} />
          {loadMore && <Button onLoadMore={onLoadMore} />}
        </>
      )}
    </div>
  );
};
