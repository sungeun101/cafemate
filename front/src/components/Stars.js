import React from 'react';
import { StarContainer, StarIcon } from './Stars.style';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Stars = ({ star, size }) => {
  const starArr = Array.from({ length: 5 }, (v, i) => i + 1);

  return (
    <StarContainer>
      {starArr.map((starNum) => (
        <StarIcon
          key={starNum}
          icon={starArr.indexOf(starNum) < star ? faStar : farStar}
          size={size || '2x'}
        />
      ))}
    </StarContainer>
  );
};

export default Stars;
