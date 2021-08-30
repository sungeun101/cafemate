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
  SubName,
  TitleContainer,
} from './Detail.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Stars from 'components/Stars';
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
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    if (userInfo.googleId) {
      setUserLogin(true);
    }
  }, [userInfo]);

  useEffect(() => {
    getCafeDetail();
    getCafeComments();
  }, []);

  let { id } = useParams();
  const cafe_id = parseInt(id);

  const { name, sub, address, phone, time, star, likeState, likesCount } = cafe;

  const getCafeDetail = async () => {
    try {
      const res = await cafeService.getCafeById(cafe_id);
      console.log('get cafe : ', res);
      setCafe(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCafeComments = async () => {
    try {
      const res = await commentService.getCommentsByCafeId(id);
      console.log('get comments : ', res);
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
          <Name>{name}카페이름</Name>
          {sub && <SubName>{sub}</SubName>}
          <Heart
            likeState={likeState}
            cafe={cafe}
            userInfo={userInfo}
            userLogin={userLogin}
          />
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
          <Menu cafe={cafe} />
          <Reviews
            comments={comments}
            getCafeComments={getCafeComments}
            userInfo={userInfo}
            userLogin={userLogin}
          />
        </MenuAndReviews>
        <LocationAndTags>
          <Location cafe={cafe} />
          <Tags cafe={cafe} />
        </LocationAndTags>
      </FlexContainer>
    </div>
  );
};

export default Detail;
