import React from 'react';
import { useHistory } from 'react-router-dom';

const Main = () => {
  let history = useHistory();
  const cafe = {
    id: 1,
    name: '카페 일',
    img_path:
      'https://blog.kakaocdn.net/dn/zRTMr/btqW4iEwRTw/fULNvoGxM6kOIkE04dSK9K/img.jpg',
    latitude: 89.584991,
    longitude: 95.18178,
    phone: '010-0000-0000',
    time: '09:00~24:00',
    star: 5,
    menu: '아메리카노(HOT, ICE):3,500/카페민트:4,500/딸기라떼:5,500/민트초코라떼:5,000',
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
