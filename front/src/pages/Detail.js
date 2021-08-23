import React, { useEffect, useState } from 'react';
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
  console.log('cafe : ', cafe);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkLiked();
  }, []);

  const user_id = 1;

  const checkLiked = async () => {
    const res = await likesService.getLikedByUserId(user_id);
    console.log('getLikedByUserId result : ', res.data);
    if (res.data.length > 0) {
      const obj = res.data.find((element) => element.cafe_id === cafe.id);
      if (obj) {
        setLiked(true);
      }
    }
  };

  const handleLikes = async () => {
    setLiked((prev) => !prev);
    if (!liked) {
      AddtoLikes();
    } else {
      RemoveFromLikes();
    }
  };

  const AddtoLikes = async () => {
    try {
      const res = await likesService.addLike({
        cafe_id: cafe.id,
        user_id,
      });
      console.log('addLike result : ', res);
    } catch (e) {
      console.log(e.message);
    }
  };

  const RemoveFromLikes = async () => {
    try {
      const res = await likesService.cancelLike({
        cafe_id: cafe.id,
        user_id,
      });
      console.log('cancelLike result : ', res);
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
