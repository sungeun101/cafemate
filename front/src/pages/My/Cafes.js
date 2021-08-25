import { Empty, Skeleton, Card } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
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

  const heartRef = useRef();

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    if (likes.length > 0) {
      getCafes();
    }
  }, [likes]);

  const user_id = 1;

  const getLikes = async () => {
    setLoading(true);
    try {
      const res = await likesService.getLikedByUserId(user_id);
      // console.log('getLikes result : ', res.data);
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
      // const res = await cafeService.getCafesById(obj.cafe_id);
      const res = await cafeService.getCafesById(obj.id);
      // console.log('getCafes result : ', res);
      resArr.push(res.data);
    }
    setMyCafes(resArr);
    setLoading(false);
  };

  const onClick = (cafe, e) => {
    console.log('heartRef.current', heartRef.current);
    console.log('e.target', e.target);
    console.log(heartRef.current.contains(e.target));

    // history.push({
    //   pathname: `/detail/${cafe.id}`,
    //   state: { cafe },
    // });
  };

  const RemoveFromLikes = async (cafe) => {
    // try {
    //   const res = await likesService.cancelLike({
    //     //   cafe_id: cafe.id,
    //     id: cafe.id,
    //     user_id,
    //   });
    //   console.log('cancelLike result : ', res);
    // } catch (e) {
    //   console.log(e.message);
    // }
    // getLikes();
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
          cover={<Cover alt={cafe.name} src={cafe.img_path} />}
        >
          <Meta
            title={cafe.name}
            description={
              <Description>
                <p>주소(동까지)</p>
                <HeartContainer ref={heartRef}>
                  <HeartIcon
                    icon={faHeart}
                    onClick={() => RemoveFromLikes(cafe)}
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
