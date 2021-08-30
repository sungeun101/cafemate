/* global kakao */
import React, { useEffect } from 'react';
import { InfoWrapper } from 'globalStyles';
import { Map } from './Location.style';

const Location = ({ cafe }) => {
  const { longtitude, latitude } = cafe;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longtitude),
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
