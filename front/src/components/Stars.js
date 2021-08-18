import React from 'react';
import { StarContainer, StarIcon } from './Stars.style';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const Stars = ({ star }) => {
  const coloredStar = Array.from({ length: star });
  const emptyStar = Array.from({ length: 5 - coloredStar.length });

  return (
    <StarContainer>
      {coloredStar.map((count, i) => {
        return <StarIcon key={i} icon={faStar} size="2x" />;
      })}
      {emptyStar.map((count, i) => {
        return <StarIcon key={i} icon={farStar} size="2x" />;
      })}
    </StarContainer>
  );
};

export default Stars;
