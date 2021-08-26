import React, { useEffect, useState } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { Wrapper } from './Gallery.style';

const Gallery = ({ cafe, comments }) => {
  const [images, setImages] = useState([]);
  const [showNav, setShowNav] = useState(false);

  const thumbnailHeight = 60;
  const originalHeight = 450;

  const { img_path } = cafe;

  const initialState = {
    original: img_path,
    thumbnail: img_path,
    originalHeight,
    thumbnailHeight,
  };

  useEffect(() => {
    if (img_path && img_path.length > 0) {
      setImages([initialState]);
    }
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      const commentsWithImage = comments.filter(
        (comment) => comment.img_path !== ''
      );
      let arr = [];
      commentsWithImage.forEach((comment) =>
        arr.push({
          original: comment.img_path,
          thumbnail: comment.img_path,
          originalHeight,
          thumbnailHeight,
        })
      );
      setImages([initialState, ...arr]);
    }
  }, [comments]);

  return (
    <Wrapper
      onMouseOver={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      {images ? (
        <ImageGallery
          items={images}
          showNav={showNav}
          showPlayButton={false}
          showThumbnails={images.length === 1 ? false : true}
        />
      ) : null}
    </Wrapper>
  );
};

export default Gallery;
