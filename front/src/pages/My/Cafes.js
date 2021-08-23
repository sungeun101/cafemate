import { Empty, Skeleton } from 'antd';
import React, { useState } from 'react';
import { Container } from './Reviews.style';

const MyCafes = () => {
  const [myCafes, setmyCafes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : myCafes.length === 0 ? (
        <Empty description="찜한 카페가 없습니다." />
      ) : (
        // <CommentList comments={myCafes} getMyComments={getMyComments} />
        <span>카페리스트</span>
      )}
    </Container>
  );
};

export default MyCafes;
