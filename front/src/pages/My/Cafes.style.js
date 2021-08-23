import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 0;
  max-width: 1300px;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
export const StyledCard = styled(Card)`
  width: 15rem;
  border-radius: 20px;
  overflow: hidden;
`;
