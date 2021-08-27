import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 0;
`;
export const CafeContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-gap: 2vw 0;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;
export const StyledCard = styled(Card)`
  width: 15rem;
  border-radius: 20px;
  overflow: hidden;
  cursor: default;
`;
export const Description = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Cover = styled.img`
  height: 11rem;
`;
export const HeartContainer = styled.div`
  align-self: flex-end;
`;
