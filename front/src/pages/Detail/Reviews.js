import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getComment } from 'redux/ducks/comment';
import { Comment } from 'antd';
import { InfoWrapper } from 'globalStyles';
import CommentForm from './CommentForm';
import { Count, StyledDivider } from './Reviews.style';
import CommentList from 'components/CommentList';

const Reviews = ({ comments, getCafeComments }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComment());
  // }, [dispatch]);

  // const comment = useSelector((state) => state.comment.comment);
  // console.log('comment reviews', comment);

  return (
    <InfoWrapper>
      <h1>
        REVIEWS <Count>({comments ? comments.length : 0})</Count>
      </h1>
      <Comment content={<CommentForm getCafeComments={getCafeComments} />} />
      {comments.length > 0 && <StyledDivider />}
      {comments && (
        <CommentList comments={comments} getCafeComments={getCafeComments} />
      )}
    </InfoWrapper>
  );
};

export default Reviews;
