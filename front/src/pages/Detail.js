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
  TitleContainer,
} from './Detail.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import Stars from '../components/Stars';
import { useLocation } from 'react-router-dom';
import { likesService } from '../service/likes';

const Detail = () => {
  let location = useLocation();
  const cafe = location.state.cafe;
  console.log(cafe);

  const [liked, setLiked] = useState(false);

  const user_id = 1;

  const handleLikes = async () => {
    setLiked((prev) => !prev);
    try {
      const res = await likesService.likeCafe({
        cafe_id: cafe.id,
        user_id,
      });
      console.log('likeCafe result : ', res);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <Gallery />

      <TitleContainer>
        <NameContainer>
          <Name>{cafe.name}</Name>
          <HeartIcon onClick={handleLikes} icon={liked ? faHeart : farHeart} />
          <HeartCount>120</HeartCount>
        </NameContainer>
        <Stars star={cafe.star} />
      </TitleContainer>

      <Divider />

      <InfoList>
        <InfoItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <InfoText>주소</InfoText>
        </InfoItem>
        <InfoItem>
          <ClockCircleOutlined />
          <InfoText>{cafe.time}</InfoText>
        </InfoItem>
        <InfoItem>
          <PhoneOutlined />
          <InfoText>{cafe.phone}</InfoText>
        </InfoItem>
      </InfoList>

      <FlexContainer>
        <MenuAndReviews>
          <Menu />
          <Reviews cafe={cafe} />
        </MenuAndReviews>
        <LocationAndTags>
          <Location />
          <Tags />
        </LocationAndTags>
      </FlexContainer>
    </div>
  );
};

export default Detail;
