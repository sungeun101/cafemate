import React, { useState } from 'react';
import Location from '../components/Location';
import Menu from '../components/Menu';
import Reviews from '../components/Reviews';
import Tags from '../components/Tags';
import Gallery from '../components/Gallery';
import { ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {
  FlexContainer,
  HeartIcon,
  HeartCount,
  InfoItem,
  InfoList,
  InfoText,
  LocationAndTags,
  MenuAndReviews,
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

      <InfoList>
        <InfoItem>
          <i className="fas fa-map-marker-alt"></i>
          <InfoText style={{ marginLeft: '0.8rem' }}>주소</InfoText>
        </InfoItem>
        <InfoItem>
          <ClockCircleOutlined />
          <InfoText>영업시간</InfoText>
        </InfoItem>
        <InfoItem>
          <PhoneOutlined />
          <InfoText>연락처</InfoText>
        </InfoItem>
      </InfoList>

      <FlexContainer>
        <MenuAndReviews>
          <Menu />
          {/* <Reviews /> */}
        </MenuAndReviews>
        {/* <LocationAndTags>
          <Location />
          <Tags />
        </LocationAndTags> */}
      </FlexContainer>
    </div>
  );
};

export default Detail;
