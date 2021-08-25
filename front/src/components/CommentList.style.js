import styled from 'styled-components';
import { List, Button, Image } from 'antd';

export const StyledList = styled(List)``;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--grey-color);
  border-radius: 10px;
`;
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;
export const AuthorAndTime = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;
export const AuthorName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: var(--black-color);
`;
export const Datetime = styled.div`
  font-size: 0.8rem;
`;
export const RightBox = styled.div`
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const BtnContainer = styled.div``;
export const StyledButton = styled(Button)`
  &:last-child {
    margin-left: 0.4rem;
  }
`;
export const ContentsContainer = styled.div`
  display: flex;
  gap: 1rem;
  /* flex-wrap: wrap; */
  margin-top: 0.5rem;
  padding: 0 1rem;
  position: relative;
`;
export const StyledImage = styled(Image)`
  width: 10.9rem;
`;
export const Content = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  &.open {
    display: block;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

export const MoreBtn = styled.span`
  font-weight: 600;
  position: absolute;
  bottom: 0;
  right: 1rem;
  padding-left: 20px;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 17%
  );
  cursor: pointer;
  &.open {
    display: none;
  }
`;
