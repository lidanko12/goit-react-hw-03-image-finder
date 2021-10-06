import React, { Component } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import Load from './components/Loader';

export default class App extends Component {
  state = {
    text: '',
    page: 1,
    images: [],
    showModal: false,
    error: null,
    status: 'idle',
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.text;
    const nextQuery = this.state.text;

    if (prevQuery !== nextQuery) {
      this.setState({ images: [], page: 1 });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const API_KEY = '22920296-83f622dc6fe28ab18a69af7db';
    const BASE_URL = 'https://pixabay.com/api';
    const { text, page } = this.state;
    const perPage = 15;
    const request = `/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=${perPage}&key=${API_KEY}`;

    this.setState({ status: 'pending' });

    fetch(BASE_URL + request)
      .then(res => res.json())
      .then(array => {
        const images = array.hits;
        if (images.length < 1) {
          toast.error('Nothing found, specify your search');
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
          page: prevState.page + 1,
        }));
        if (page > 1) {
          this.pageScroll();
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalImgInfo = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onSubmit = text => {
    this.setState({ text });
  };

  onLoadMore = () => {
    this.fetchImages();
  };

  render() {
    const { images, showModal, largeImageURL, tags, status } = this.state;
    return (
      <>
        <div className={s.App}>
          <Searchbar onSubmit={this.onSubmit} />
          {status === 'pending' && <Load />}
          <ImageGallery
            images={images}
            setModalImgInfo={this.setModalImgInfo}
          />
          {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </div>
        <ToastContainer transition={Zoom}  />
      </>
    );
  }
}
