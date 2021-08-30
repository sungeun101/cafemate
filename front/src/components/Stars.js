import React from 'react';
import { StarContainer, StyledRate } from './Stars.style';

const Stars = ({ star }) => {
  return (
    <StarContainer>
      <StyledRate
        allowHalf
        disabled
        defaultValue={Math.round(star * 100) / 100}
      />
    </StarContainer>
  );
};

export default Stars;
