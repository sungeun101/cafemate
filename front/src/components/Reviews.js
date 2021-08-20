import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../redux/ducks/comment';
import { Comment, Divider, message } from 'antd';
import { InfoWrapper } from '../globalStyles';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { commentService } from '../service/comments.js';

const Reviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  const comment = useSelector((state) => state.comment.comment);
  console.log('comment', comment);

  const addComment = async (value) => {
    try {
      const res = await commentService.add(value);
      console.log('post comment result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    dispatch(getComment());
    message.success('작성되었습니다.');
  };

  return (
    <InfoWrapper>
      <h1>
        REVIEWS{' '}
        <span style={{ color: 'var(--main-color)' }}>
          ({comment ? comment.length : 0})
        </span>
      </h1>
      <Comment content={<CommentForm addComment={addComment} />} />
      <Divider style={{ marginTop: '-1rem' }} />
      {comment && <CommentList />}
    </InfoWrapper>
  );
};

export default Reviews;
