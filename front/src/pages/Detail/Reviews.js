import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getComment } from 'redux/ducks/comment';
import { Comment } from 'antd';
import { InfoWrapper } from 'globalStyles';
import CommentForm from './CommentForm';
import { commentService } from 'service/comments';
import { Count, StyledDivider } from './Reviews.style';
import CommentList from 'components/CommentList';

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
      const res = await commentService.getCommentsByCafeId(cafe.id);
      console.log('getCafeComments : ', res);
      setComments(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

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
