import React, { useEffect, useState } from 'react';
import { commentService } from 'service/comments';
import CommentList from 'components/CommentList';
import { Empty, Skeleton } from 'antd';
import { Container, Title } from './Reviews.style';

const MyReviews = () => {
  const [myComments, setMyComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const myUserId = window.localStorage.getItem("googleId");

  useEffect(() => {
    getMyComments();
  }, []);

  const getMyComments = async () => {
    setLoading(true);
    try {
      const res = await commentService.getCommentsByUserId(myUserId);
      console.log('getMyComments result : ', res.data);
      setMyComments(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <Skeleton active={true} avatar paragraph={{ rows: 4 }} />
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
