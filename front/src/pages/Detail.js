import React, { useState } from 'react';
import Gallery from '../components/Gallery';
import { Divider } from 'antd';
import {
  HeartIcon,
  HeartCount,
  Name,
  NameContainer,
  StarContainer,
  TitleContainer,
  StarIcon,
} from './Detail.style';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  faStar as farStar,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';

const Detail = () => {
  const [liked, setLiked] = useState(true);
  const star = Array.from({ length: 3 });
  const emptyStar = Array.from({ length: 5 - star.length });

  const handleLikes = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div>
      <Gallery />

      <TitleContainer>
        <NameContainer>
          <Name>ABC카페</Name>
          <HeartIcon
            onClick={handleLikes}
            icon={liked ? faHeart : farHeart}
          ></HeartIcon>
          <HeartCount>120</HeartCount>
        </NameContainer>
        <StarContainer>
          {star.map((count, i) => {
            return <StarIcon key={i} icon={faStar} size="2x" />;
          })}
          {emptyStar.map((count, i) => {
            return <StarIcon key={i} icon={farStar} size="2x" />;
          })}
        </StarContainer>
      </TitleContainer>

      <Divider />
    </div>
  );
};

export default Detail;
