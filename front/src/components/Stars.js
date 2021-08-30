import React from 'react';
import { StarContainer, StyledRate } from './Stars.style';

const Stars = ({ star, small }) => {
  return (
    <StarContainer>
      <StyledRate
        small={small}
        allowHalf
        disabled
        defaultValue={Math.round(star * 100) / 100}
      />
    </StarContainer>
  );
};

export default Stars;
