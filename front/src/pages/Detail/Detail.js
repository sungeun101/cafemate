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
import { cafeService } from 'service/cafes';
import { useParams } from 'react-router-dom';

const Detail = ({ userInfo }) => {
  const [cafe, setCafe] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCafeDetail();
    getCafeComments();
    console.log('userInfo', userInfo);
  }, []);

  let { id } = useParams();
  const cafe_id = parseInt(id);

  const {
    name,
    img_path,
    address,
    phone,
    time,
    menu,
    star,
    cafegory,
    area,
    americano,
    dessert,
    parking,
    wifi,
    likeState,
    likesCount,
  } = cafe;

  const getCafeDetail = async () => {
    try {
      const res = await cafeService.getCafeById(cafe_id);
      console.log('getCafeDetail : ', res);
      setCafe(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCafeComments = async () => {
    try {
      const res = await commentService.getCommentsByCafeId(id);
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
          <Name>{name}</Name>
          <Heart likeState={likeState} cafe={cafe} />
          <HeartCount>{likesCount > 0 && likesCount}</HeartCount>
        </NameContainer>
        <Stars star={star} />
      </TitleContainer>

      <Divider />

      <InfoList>
        {address && (
          <InfoItem>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <InfoText>{address}</InfoText>
          </InfoItem>
        )}
        {time && (
          <InfoItem>
            <ClockCircleOutlined />
            <InfoText>{time}</InfoText>
          </InfoItem>
        )}
        {phone && (
          <InfoItem>
            <PhoneOutlined />
            <InfoText>{phone}</InfoText>
          </InfoItem>
        )}
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
