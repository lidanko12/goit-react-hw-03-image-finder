import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
 function ImageGalleryItem({ webformatURL, largeImageURL, tags, setModalImgInfo }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => setModalImgInfo({ largeImageURL, tags })}
              className={s.ImageGalleryItem__image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  setModalImgInfo: PropTypes.func.isRequired,
};

export default ImageGalleryItem