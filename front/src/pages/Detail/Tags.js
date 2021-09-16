import React, { useEffect, useState } from 'react';
import { InfoWrapper } from 'globalStyles';
import { StyledTag } from './Tags.style';

const tagsData = {
  마카롱: 'macaron',
  빙수: 'ice',
  와플: 'waffle',
  허니브레드: 'honey',
  케이크: 'cake',
  스무디: 'smoothie',
  밀크티: 'milktea',
  스콘: 'scone',
  에이드: 'ade',
  아이스티: 'icedtea',
  크로플: 'cropple',
  샌드위치: 'sandwich',
  베이글: 'bagel',
  깔끔한: 'clean',
  '과제하기 좋은': 'work',
  '수다떨기 좋은': 'chat',
  '사진찍기 좋은': 'camera',
  '디저트가 있는': 'dessert',
  '로스팅 직접 하는': 'roasting',
};

const Tags = ({ cafe }) => {
  const [tags, setTags] = useState([]);

  const { category, dessert, parking, wifi } = cafe;

  useEffect(() => {
    let tagNames = [];
    if (category) {
      const categoryNames = Object.keys(tagsData).filter(
        (key) => tagsData[key] === category
      );
      tagNames.push(...categoryNames);
    }
    if (dessert) {
      const dessertNames = Object.keys(tagsData).filter(
        (key) => tagsData[key] === dessert
      );
      tagNames.push(...dessertNames);
    }
    if (parking) {
      tagNames.push('주차가능');
    }
    if (wifi) {
      tagNames.push('와이파이');
    }
    setTags(tagNames);
  }, [cafe]);

  return (
    <InfoWrapper>
      <h1>TAGS</h1>
      {tags.map((tag, index) => (
        <StyledTag key={index}>{tag}</StyledTag>
      ))}
    </InfoWrapper>
  );
};

export default Tags;
