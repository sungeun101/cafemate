import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../redux/ducks/comment';
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Button, Input, Popconfirm } from 'antd';
import { InfoWrapper } from '../globalStyles';
import {
  BtnContainer,
  CameraIcon,
  CommentContainer,
  Content,
  Header,
  StarIcon,
  StyledButton,
  StyledComment,
  StyledList,
} from './Reviews.style';
const { TextArea } = Input;

const Reviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  const comment = useSelector((state) => state.comment.comment);
  console.log(comment);

  const [rating, setRating] = useState(0);
  const yellowStar = Array.from({ length: rating }, (v, i) => i + 1);
  const greyStar = Array.from({ length: 5 - rating }, (v, i) => i + 1);

  const handleRating = (count) => {
    console.log(count);
    setRating(count);
  };

  return (
    <InfoWrapper>
      <h1>REVIEWS</h1>
      <Header>
        <div>
          {yellowStar.map((count, i) => {
            return (
              <StarIcon
                selected
                key={i}
                icon={faStar}
                size="2x"
                onClick={() => handleRating(count)}
              />
            );
          })}
          {greyStar.map((count, i) => {
            return (
              <StarIcon
                key={i}
                icon={faStar}
                size="2x"
                onClick={() => handleRating(count + rating)}
              />
            );
          })}
        </div>
        <div>
          <CameraIcon icon={faCamera} size="2x" />
          <StyledButton type="primary">등록</StyledButton>
        </div>
      </Header>

      <TextArea placeholder="후기를 작성해주세요." rows={4} />

      {comment && comment.map((item) => <h1 key={item.id}>{item.content}</h1>)}
    </InfoWrapper>
  );
};

export default Reviews;
