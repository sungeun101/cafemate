/* global kakao */
import React, { useEffect } from 'react';
import { InfoWrapper } from 'globalStyles';
import { Map } from './Location.style';

const Location = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <InfoWrapper>
      <h1>LOCATION</h1>
      <Map id="map" />
    </InfoWrapper>
  );
};

export default Location;
