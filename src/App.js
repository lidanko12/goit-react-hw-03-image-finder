import React, { Component } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import  s from'./App.module.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button'
import Modal from './components/Modal';

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
      setTimeout(() => {
        this.fetchImages();
      }, 1000);
    }
  }

  fetchImages = () => {
    const API_KEY = '22920296-83f622dc6fe28ab18a69af7db';
    const BASE_URL = 'https://pixabay.com/api';
    const { text, page } = this.state;
    const perPage = 12;
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
        this.handlePageScroll();
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

  handlePageScroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
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
          {status === 'pending' && (
            <Loader
              className={s.Loader}
              type="TailSpin"
              color="#c5000a"
              height={150}
              width={150}
              timeout={2000}
              
            />
          )}
          <ImageGallery images={images} setModalImgInfo={this.setModalImgInfo} />
          {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </div>
        <ToastContainer transition={Zoom} autoClose={3000} />
      </>
    );
  }
}