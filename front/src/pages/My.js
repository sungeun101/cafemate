import React from 'react';
import { Tabs } from 'antd';
import MyReviews from '../components/MyReviews';

const { TabPane } = Tabs;

const My = () => {
  return (
    <Tabs centered size="large" defaultActiveKey="2">
      <TabPane tab="찜한 카페" key="1"></TabPane>
      <TabPane tab="리뷰 내역" key="2">
        <MyReviews />
      </TabPane>
    </Tabs>
  );
};

export default My;
