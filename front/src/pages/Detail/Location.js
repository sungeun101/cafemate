/* global kakao */
import React, { useEffect } from 'react';
import { InfoWrapper } from 'globalStyles';
import { Map } from './Location.style';
import { Skeleton } from 'antd';

const Location = ({ cafe, loading }) => {
  const { longitude, latitude } = cafe;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <InfoWrapper>
      <h1>LOCATION</h1>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 4 }} />
      ) : (
        <Map id="map" />
      )}
    </InfoWrapper>
  );
};

export default Location;
