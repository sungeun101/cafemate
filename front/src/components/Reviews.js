import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../redux/ducks/comment';
import { Comment, Divider } from 'antd';
import { InfoWrapper } from '../globalStyles';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Reviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  const comment = useSelector((state) => state.comment.comment);
  console.log('comment', comment);

  return (
    <InfoWrapper>
      <h1>
        REVIEWS{' '}
        <span style={{ color: 'var(--main-color)' }}>
          ({comment ? comment.length : 0})
        </span>
      </h1>
      <Comment content={<CommentForm />} />
      <Divider style={{ marginTop: '-1rem' }} />
      {comment && <CommentList comment={comment} />}
    </InfoWrapper>
  );
};

export default Reviews;
