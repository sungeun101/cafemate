import { Empty, Skeleton, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { cafeService } from 'service/cafes';
import { likesService } from 'service/likes';
import { StyledCard, Container } from './Cafes.style';
const { Meta } = Card;

const MyCafes = () => {
  const [likes, setLikes] = useState([]);
  const [myCafes, setMyCafes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const res = await cafeService.getCafesById(obj.cafe_id);
      console.log('getCafes result : ', res);
      resArr.push(res.data);
    }
    setMyCafes(resArr);
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : likes.length === 0 ? (
        <Empty description="찜한 카페가 없습니다." />
      ) : (
        myCafes.map((cafe) => (
          <StyledCard
            key={cafe.id}
            hoverable
            cover={<img alt={cafe.name} src={cafe.img_path} />}
          >
            <Meta title={cafe.name} description="주소(동까지)" />
          </StyledCard>
        ))
      )}
    </Container>
  );
};

export default MyCafes;
