import styled from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const Items = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const UpOutlinedIcon = styled(UpOutlined)`
  font-size: 1.7rem;
`;
export const DownOutlinedIcon = styled(DownOutlined)`
  font-size: 1.7rem;
`;
