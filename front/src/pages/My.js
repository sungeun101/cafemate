import React from 'react';
import { Tabs } from 'antd';
import MyReviews from '../components/MyReviews';
import { StyledTabs } from './My.style';
const { TabPane } = Tabs;

const My = () => {
  return (
    <StyledTabs centered size="large" defaultActiveKey="2">
      <TabPane tab="찜한 카페" key="1"></TabPane>
      <TabPane tab="리뷰 내역" key="2">
        <MyReviews />
      </TabPane>
    </StyledTabs>
  );
};

export default My;
