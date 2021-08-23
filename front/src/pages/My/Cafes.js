import { Empty, Skeleton, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { cafeService } from 'service/cafes';
import { likesService } from 'service/likes';
import Heart from 'components/Heart';
import {
  StyledCard,
  Container,
  Description,
  HeartContainer,
  Cover,
  CafeContainer,
} from './Cafes.style';
const { Meta } = Card;

const MyCafes = () => {
  const [likes, setLikes] = useState([]);
  const [myCafes, setMyCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    if (likes.length > 0) {
      setLoading(true);
      getCafes();
    }
  }, [likes]);

  const user_id = 1;

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
    let resArr = [];
    for await (const obj of likes) {
      // const res = await cafeService.getCafesById(obj.cafe_id);
      const res = await cafeService.getCafesById(obj.id);
      console.log('getCafes result : ', res);
      resArr.push(res.data);
    }
    setMyCafes(resArr);
    setLoading(false);
  };

  const onClick = (cafe) => {
    // history.push({
    //   pathname: `/detail/${cafe.id}`,
    //   state: { cafe },
    // });
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
          onClick={() => onClick(cafe)}
          key={cafe.id}
          hoverable
          cover={<Cover alt={cafe.name} src={cafe.img_path} />}
        >
          <Meta
            title={cafe.name}
            description={
              <Description>
                <p>주소(동까지)</p>
                <HeartContainer>
                  <Heart liked={liked} setLiked={setLiked} cafe={cafe} />
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
