import { Tabs } from 'antd';
import styled from 'styled-components';

export const StyledTabs = styled(Tabs)`
  margin-top: 4rem;
  .ant-tabs-tab {
    color: var(--black-color);
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: var(--main-color);
  }
  .ant-tabs-ink-bar {
    background: var(--main-color);
  }
`;
