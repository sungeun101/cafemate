import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getComment } from '../redux/ducks/comment';
import { Comment, Divider } from 'antd';
import { InfoWrapper } from '../globalStyles';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { commentService } from '../service/comments';

const Reviews = ({ cafe }) => {
  const [comments, setComments] = useState([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComment());
  // }, [dispatch]);

  // const comment = useSelector((state) => state.comment.comment);
  // console.log('comment reviews', comment);

  useEffect(() => {
    getCafeComments();
  }, []);

  const getCafeComments = async () => {
    try {
      const res = await commentService.getByCafeId(cafe.id);
      console.log('getCafeComments : ', res);
      setComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <InfoWrapper>
      <h1>
        REVIEWS{' '}
        <span style={{ color: 'var(--main-color)' }}>
          ({comments ? comments.length : 0})
        </span>
      </h1>
      <Comment content={<CommentForm getCafeComments={getCafeComments} />} />
      {comments.length > 0 && <Divider style={{ marginTop: '-1rem' }} />}
      {comments && (
        <CommentList comments={comments} getCafeComments={getCafeComments} />
      )}
    </InfoWrapper>
  );
};

export default Reviews;
