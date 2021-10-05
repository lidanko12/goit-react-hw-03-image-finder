import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from'./ImageGallery.module.css';
import PropTypes from 'prop-types';

 function ImageGallery({ images, setModalImgInfo }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, tags, id }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          setModalImgInfo={setModalImgInfo}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  setModalImgInfo: PropTypes.func.isRequired,
};

export default ImageGallery