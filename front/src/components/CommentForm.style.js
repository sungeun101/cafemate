import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledForm = styled(Form)``;
export const StyledInput = styled(Input)``;
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
