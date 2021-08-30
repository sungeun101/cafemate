import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const TitleContainer = styled.div`
  margin-top: 5vh;
  margin-bottom: -1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Name = styled.h1`
  display: inline-block;
  color: var(--main-color);
  font-weight: 700;
  font-size: 1.8rem;
  margin-right: 0.8rem;
`;

export const HeartCount = styled.div`
  color: var(--black-color);
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.4rem;
  margin-top: -0.6rem;
`;
export const StarContainer = styled.div`
  margin-top: -0.6rem;
`;
export const StarIcon = styled(FontAwesomeIcon)`
  color: var(--yellow-color);
`;
export const InfoList = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const InfoItem = styled.li`
  flex: 1;
  @media (max-width: 768px) {
    margin-bottom: 0.3rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
export const InfoText = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`;
export const FlexContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const MenuAndReviews = styled.div`
  display: flex;
  flex-direction: column;
  width: 43vw;
  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }
`;
export const LocationAndTags = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  @media (max-width: 768px) {
    order: 1;
    width: 100%;
  }
`;
