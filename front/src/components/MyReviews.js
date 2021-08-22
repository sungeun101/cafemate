import React, { useEffect, useState } from 'react';
import { commentService } from '../service/comments';
import CommentList from './CommentList';
import { Empty, Skeleton } from 'antd';
import { Container, Title } from './MyReviews.style';

const MyReviews = () => {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const myUserId = 2;

  useEffect(() => {
    getMyComments();
  }, []);

  const getMyComments = async () => {
    setLoading(true);
    try {
      const res = await commentService.getCommentsByUserId(myUserId);
      console.log('getMyComments result : ', res.data);
      setMyComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      ) : (
        <>
          <Title>내가 쓴 리뷰 {myComments.length}개</Title>
          {myComments.length === 0 ? (
            <Empty description="리뷰가 없습니다." />
          ) : (
            <CommentList comments={myComments} getMyComments={getMyComments} />
          )}
        </>
      )}
    </Container>
  );
};

export default MyReviews;
