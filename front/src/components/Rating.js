import React from 'react';
import { StarIcon } from './CommentForm.style';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ form, selectedStars, setSelectedStars }) => {
  const starArr = Array.from({ length: 5 }, (v, i) => i + 1);

  const handleRating = (count) => {
    form.setFieldsValue({ star: count });
    setSelectedStars(starArr.filter((item) => item <= count));
  };

  return starArr.map((count) => (
    <StarIcon
      selected={selectedStars.includes(count)}
      key={count}
      icon={faStar}
      size="2x"
      onClick={() => handleRating(count)}
    />
  ));
};

export default Rating;
