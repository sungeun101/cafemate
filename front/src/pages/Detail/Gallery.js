import React, { useEffect, useState } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { Wrapper } from './Gallery.style';

const Gallery = ({ cafe }) => {
  const [images, setImages] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const { img_path } = cafe;

  useEffect(() => {
    let shouldCancel = false;
    const thumbnailHeight = 60;
    const originalHeight = 700;
    const call = async () => {
      if (!shouldCancel && img_path && img_path.length > 0) {
        setImages([
          {
            original: img_path,
            thumbnail: img_path,
            originalHeight,
            thumbnailHeight,
          },
          {
            original: 'https://picsum.photos/id/1018/250/150/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
            originalHeight,
            thumbnailHeight,
          },
        ]);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  return (
    <Wrapper
      onMouseOver={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      {images ? (
        <ImageGallery
          styles={{ color: 'pink' }}
          items={images}
          showNav={showNav}
          showPlayButton={false}
        />
      ) : null}
    </Wrapper>
  );
};

export default Gallery;
