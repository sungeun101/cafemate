import React, { useEffect, useState } from 'react';
import { commentService } from '../service/comments';
import CommentList from './CommentList';
import { Empty } from 'antd';

const MyReviews = () => {
  const [myComments, setMyComments] = useState([]);

  const myUserId = 2;

  useEffect(() => {
    getMyComments();
  }, []);

  const getMyComments = async () => {
    try {
      const res = await commentService.getByUserId(myUserId);
      console.log(res.data);
      setMyComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <h1>내가 쓴 리뷰 {myComments.length}개</h1>
      {myComments.length === 0 ? (
        <Empty description="리뷰가 없습니다." />
      ) : (
        <CommentList comments={myComments} getMyComments={getMyComments} />
      )}
    </>
  );
};

export default MyReviews;
