import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getComment } from 'redux/ducks/comment';
import { Comment } from 'antd';
import { InfoWrapper } from 'globalStyles';
import CommentForm from './CommentForm';
import { Count, StyledDivider } from './Reviews.style';
import CommentList from 'components/CommentList';

const Reviews = ({ comments, getCafeComments, userInfo }) => {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    if (userInfo.googleId) {
      setUserLogin(true);
    }
  }, [userInfo]);
  console.log('로그인했나요', userLogin);

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
      <Comment
        content={
          <CommentForm
            getCafeComments={getCafeComments}
            userInfo={userInfo}
            userLogin={userLogin}
          />
        }
      />
      {comments.length > 0 && <StyledDivider />}
      {comments && (
        <CommentList
          comments={comments}
          getCafeComments={getCafeComments}
          userInfo={userInfo}
          userLogin={userLogin}
        />
      )}
    </InfoWrapper>
  );
};

export default Reviews;
