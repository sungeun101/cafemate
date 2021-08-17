import React from 'react';
import { InfoWrapper } from '../globalStyles';
import { StyledTag } from './Tags.style';

const tagNames = ['디저트가 있는', '과제하기 좋은'];

const Tags = () => {
  return (
    <InfoWrapper>
      <h1>TAGS</h1>
      {tagNames.map((name, index) => (
        <StyledTag key={index}>{name}</StyledTag>
      ))}
    </InfoWrapper>
  );
};

export default Tags;
