import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { Wrapper } from './Gallery.style';

const Gallery = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const response = await axios.get(
        'https://google-photos-album-demo2.glitch.me/4eXXxxG3rYwQVf948'
      );
      if (!shouldCancel && response.data && response.data.length > 0) {
        setImages(
          response.data.map((url) => ({
            original: `${url}=w1000`,
            thumbnail: `${url}=w100`,
          }))
        );
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  return (
    <Wrapper>
      {images ? <ImageGallery items={images} showPlayButton={false} /> : null}
    </Wrapper>
  );
};

export default Gallery;
