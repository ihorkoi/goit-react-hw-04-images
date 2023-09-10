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


  const getQuery = (props) => {
    console.log(props)
    // if (newQuery.trim() !== query) {
    //   setQuery(newQuery);
    //   setImages(images);
    //   setPage(1)
    // }
  };
  // async function componentDidUpdate(prevProps, prevState) {
  //   const { page, query } = this.state;
  //   if (page !== prevState.page || query !== prevState.query) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const data = await fetchQuery(page, query);
  //       if (data.hits.length === 0) {
  //         Notiflix.Notify.failure(
  //           "Sorry, we couldn't find any matches for your query"
  //         );
  //         return;
  //       }
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...data.hits],
  //         loadMore: page < Math.ceil(data.totalHits / 12),
  //       }));
  //     } catch (err) {
  //       Notiflix.Notify.failure('Something went wrong, please try again later');
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }
   useEffect(()=>{
    const fetchData = async ()=>{
        setIsLoading(true);
        try{
        const data = await fetchQuery(page, query);
        if (data.hits.length === 0) {
          Notiflix.Notify.failure(
            "Sorry, we couldn't find any matches for your query"
          );
          return;
        }
        setImages([...images, ...data.hits]);
        setLoadMore(page < Math.ceil(data.totalHits / 12));
      }catch (err) {
        Notiflix.Notify.failure('Something went wrong, please try again later');
      } finally {
        setIsLoading(false);
      }
      }
      fetchData()
  }, [page, query])

  const onLoadMore = () => {
    setPage(page + 1);
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
}
