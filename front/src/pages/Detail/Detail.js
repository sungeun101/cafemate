import React, { useEffect, useState } from 'react';
import { ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import {
  FlexContainer,
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
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Stars from 'components/Stars';
import { likesService } from 'service/likes';
import Gallery from './Gallery';
import Menu from './Menu';
import Reviews from './Reviews';
import Location from './Location';
import Tags from './Tags';
import Heart from './Heart';
import { commentService } from 'service/comments';
const Detail = ({ cafe, userInfo }) => {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    checkLiked();
    console.log('user', userInfo);
  }, []);

  const user_id = 1;

  const checkLiked = async () => {
    try {
      const res = await likesService.getLikedByUserId(user_id);
      console.log('getLikedByUserId result : ', res.data);
      if (res.data.length > 0) {
        const obj = res.data.find((element) => element.cafe_id === cafe.id);
        if (obj) {
          setLiked(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCafeComments();
  }, []);

  const getCafeComments = async () => {
    try {
      const res = await commentService.getCommentsByCafeId(cafe.id);
      console.log('getCafeComments : ', res);
      setComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <Gallery cafe={cafe} comments={comments} />

      <TitleContainer>
        <NameContainer>
          <Name>{cafe.name}</Name>
          <Heart liked={liked} setLiked={setLiked} cafe={cafe} />
          <HeartCount>120</HeartCount>
        </NameContainer>
        <Stars star={cafe.star} />
      </TitleContainer>

      <Divider />

      <InfoList>
        <InfoItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <InfoText>{cafe.address}</InfoText>
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
          <Reviews
            comments={comments}
            getCafeComments={getCafeComments}
            userInfo={userInfo}
          />
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
