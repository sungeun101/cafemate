/* global kakao */
import React, { useState, useEffect } from 'react';

function MapContainer() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.361425, 126.529418),
      level: 9,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
          lon = position.coords.longitude;
        var locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    const map = new kakao.maps.Map(container, options);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  return (
    <div
      id="map"
      style={{
        width: `${width - 200}px`,
        height: '100vh',
      }}
    ></div>
  );
}

export default MapContainer;
