import { Empty, Skeleton, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { cafeService } from 'service/cafes';
import { likesService } from 'service/likes';
import {
  StyledCard,
  Container,
  Description,
  HeartContainer,
  Cover,
  CafeContainer,
} from './Cafes.style';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HeartIcon } from 'pages/Detail/Heart.style';
const { Meta } = Card;

const MyCafes = () => {
  const [likes, setLikes] = useState([]);
  const [myCafes, setMyCafes] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    if (likes.length > 0) {
      getCafes();
    }
  }, [likes]);

  const user_id = window.localStorage.getItem("googleId");

  const getLikes = async () => {
    setLoading(true);
    try {
      const res = await likesService.getLikedByUserId(user_id);
      console.log('getLikes result : ', res.data);
      setLikes(res.data);
    } catch (e) {
      console.log(e.messgae);
    }
    setLoading(false);
  };

  const getCafes = async () => {
    setLoading(true);
    let resArr = [];
    for await (const obj of likes) {
      const res = await cafeService.getCafeById(obj.cafeId);
      console.log('getCafe result : ', res);
      resArr.push(res.data);
    }
    setMyCafes(resArr);
    setLoading(false);
  };

  const onClick = (cafe) => {
    history.push({
      pathname: `/detail/${cafe.id}`,
      state: { cafe },
    });
  };

  const RemoveFromLikes = async (cafe, e) => {
    e.stopPropagation();
    try {
      const res = await likesService.cancelLike({
        cafe_id: cafe.id,
        user_id: user_id,
      });
      console.log('cancelLike result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    getLikes();
  };

  return loading ? (
    <Container>
      <Skeleton active={true} paragraph={{ rows: 4 }} />
    </Container>
  ) : likes.length === 0 ? (
    <Container>
      <Empty description="찜한 카페가 없습니다." />
    </Container>
  ) : (
    <CafeContainer>
      {myCafes.map((cafe) => (
        <StyledCard
          onClick={(e) => onClick(cafe, e)}
          key={cafe.id}
          hoverable
          cover={<Cover alt={cafe.name} src={ cafe.img_path ? `http://${cafe.img_path}` : "https://1.bp.blogspot.com/-ZO8wGSRzFBA/YSnWa5QV6ZI/AAAAAAAAD-Y/3n5lSJwrx-Yh3McA1GpGCg6POSjrvsPPwCLcBGAsYHQ/s800/noimage.png"} />}
        >
          <Meta
            title={cafe.name}
            description={
              <Description>
                <p>{cafe.address}</p>
                <HeartContainer>
                  <HeartIcon
                    icon={faHeart}
                    onClick={(e) => RemoveFromLikes(cafe, e)}
                  />
                </HeartContainer>
              </Description>
            }
          />
        </StyledCard>
      ))}
    </CafeContainer>
  );
};

export default MyCafes;
