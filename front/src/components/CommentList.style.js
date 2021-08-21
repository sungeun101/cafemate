import styled from 'styled-components';
import { List } from 'antd';

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
export const Content = styled.div`
  margin-top: 0.5rem;
`;
export const RightBox = styled.div`
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const BtnContainer = styled.div``;
