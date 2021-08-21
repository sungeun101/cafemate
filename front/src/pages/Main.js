import React from 'react';
import { useHistory } from 'react-router-dom';

const Main = () => {
  let history = useHistory();
  const cafe = {
    id: 2,
    name: '가로수 카페',
    img_path: '이미지 url',
    phone: '010-0000-0000',
    time: '09:00~24:00',
    star: 5,
    menu: '아메리카노(HOT, ICE):3,500/카페민트:4,500',
    area: '',
    americano: '',
    dessert: '',
    parking: '',
    wifi: '',
    animal: '',
  };

  const onCafeClick = () => {
    history.push({
      pathname: `/detail/${cafe.id}`,
      state: { cafe },
    });
  };

  return (
    <>
      <h1>Main Page</h1>

      <div onClick={onCafeClick}>cafe</div>
    </>
  );
};

export default Main;
