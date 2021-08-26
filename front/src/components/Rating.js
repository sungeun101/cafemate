import React from 'react';
import { StarIcon } from 'pages/Detail/CommentForm.style';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ form }) => {
  const starArr = Array.from({ length: 5 }, (v, i) => i + 1);

  const handleRating = (starNum) => {
    form.setFieldsValue({ star: starNum });
  };

  return starArr.map((starNum) => (
    <StarIcon
      selected={starArr.indexOf(starNum) < form.getFieldsValue().star}
      key={starNum}
      icon={faStar}
      size="2x"
      onClick={() => handleRating(starNum)}
    />
  ));
};

export default Rating;
