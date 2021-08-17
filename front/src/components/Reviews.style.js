import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List } from 'antd';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
export const StarIcon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.selected ? 'var(--yellow-color)' : 'var(--grey-color)'};
`;
export const CameraIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0.1rem;
  right: 7rem;
  cursor: pointer;
  &:hover {
    color: var(--main-color);
  }
`;
export const StyledButton = styled(Button)`
  background-color: var(--black-color);
  border: none;
  margin-left: 1rem;
  width: 6rem;
  border-radius: 5px;
  &:hover {
    background-color: var(--main-color);
  }
`;
export const StyledList = styled(List)`
  color: #fff;
  overflow: auto;
  padding: 0 1rem;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: rgba(234, 227, 227, 0.5);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;
export const CommentContainer = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 3rem;
  margin-bottom: 0.5rem;
`;
export const StyledComment = styled(Comment)`
  display: flex;
`;
export const Content = styled.div`
  background-color: rgba(234, 227, 227, 0.5);
  color: #000;
  border-radius: 10px;
  border-top-left-radius: 0;
  padding: 0.2rem 1rem;
  max-width: 35rem;
`;
export const BtnContainer = styled.div`
  padding-left: 2rem;
`;
