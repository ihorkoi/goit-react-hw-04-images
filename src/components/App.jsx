import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { ModalWindow } from './Modal/Modal';

import { fetchQuery } from './API';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
    showModal: false,
    loadMore: false,
    openedImg: '',
  };

  getQuery = ({ query, images }) => {
    if (query.trim() !== this.state.query) {
      this.setState({ query: query, images: images, page: 1 });
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      try {
        this.setState({ isLoading: true });
        const data = await fetchQuery(page, query);
        if (data.hits.length === 0) {
          Notiflix.Notify.failure(
            "Sorry, we couldn't find any matches for your query"
          );
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          loadMore: page < Math.ceil(data.totalHits / 12),
        }));
      } catch (err) {
        Notiflix.Notify.failure('Something went wrong, please try again later');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
    return;
  };
  onImageClick = img => {
    this.setState({ showModal: true, openedImg: img });
  };
  onImageClose = () => {
    this.setState({ showModal: false, openedImg: '' });
  };
  render() {
    const { showModal, openedImg, images, isLoading, loadMore } = this.state;
    return (
      <div className="app">
        <ModalWindow
          props={{ showModal, openedImg }}
          onImageClose={this.onImageClose}
        />
        <Searchbar onSubmit={this.getQuery} />

        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onClick={this.onImageClick} />
            {loadMore && <Button onLoadMore={this.onLoadMore} />}
          </>
        )}
      </div>
    );
  }
}
