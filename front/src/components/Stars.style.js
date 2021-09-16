import { Rate } from 'antd';
import styled from 'styled-components';

export const StarContainer = styled.div`
  margin-top: -1rem;
`;
export const StyledRate = styled(Rate)`
  font-size: ${(props) => (props.small ? '0.9rem' : '1.5rem')};
`;
