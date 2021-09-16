/* global kakao */
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
import { Map } from './Location.style';
import { InfoWrapper } from 'globalStyles';
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
import { likesService } from 'service/likes';
import { useParams } from 'react-router-dom';

const Detail = ({ userInfo }) => {
  const [cafe, setCafe] = useState({});
  const [comments, setComments] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [likeState, setLikeState] = useState(false)

  useEffect(() => {
    if (userInfo.googleId) {
      setUserLogin(true);
    }
  }, [userInfo]);

  useEffect(() => {
    getCafeDetail();
    getCafeComments();
    getLikeState();
  }, []);

  let { id } = useParams();
  const cafe_id = parseInt(id);

  const { name, sub, address, phone, time, star, likesCount } = cafe;

  const getCafeDetail = async () => {
    try {
      const res = await cafeService.getCafeById(cafe_id);
      setCafe(res.data);
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(res.data.latitude, res.data.longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      var imageSrc = "https://1.bp.blogspot.com/-08ebwsVzqag/YSXWjBOHKPI/AAAAAAAAD9s/lRd5ya_9A2AgPtylT9oyilWIGohCTv9XQCLcBGAsYHQ/s834/dark_marker.png";   
      var imageSize = new kakao.maps.Size(28, 40); 
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(res.data.latitude, res.data.longitude),
        title : res.data.name,
        image : markerImage
    });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCafeComments = async () => {
    try {
      const res = await commentService.getCommentsByCafeId(id);
      setComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getLikeState = async () => {
    try {
      const res = await likesService.getLikedByUserId(window.localStorage.getItem('googleId'))
      const list = res.data.map(d => d.cafeId)
      if (list.includes(cafe_id)){
        setLikeState(true)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div>
      <Gallery cafe={cafe} comments={comments} />

      <TitleContainer>
        <NameContainer>
          <Name>{name}</Name>
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
        <InfoWrapper>
          <h1>LOCATION</h1>
          <Map id="map" />
        </InfoWrapper>
          <Tags cafe={cafe} />
        </LocationAndTags>
      </FlexContainer>
    </div>
  );
};

export default Detail;