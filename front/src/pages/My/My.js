import React from 'react';
import { Tabs } from 'antd';
import Reviews from './Reviews';
import { StyledTabs } from './My.style';
import Cafes from './Cafes';
const { TabPane } = Tabs;

const My = ({ userInfo }) => {
  console.log('user', userInfo);
  return (
    <StyledTabs centered size="large" defaultActiveKey="1">
      <TabPane tab="찜한 카페" key="1">
        <Cafes />
      </TabPane>
      <TabPane tab="리뷰 내역" key="2">
        <Reviews />
      </TabPane>
    </StyledTabs>
  );
};

export default My;
