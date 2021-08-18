import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { StyledForm, StyledInput } from './CommentForm.style';
import {
  BtnContainer,
  CameraIcon,
  CommentContainer,
  Content,
  Header,
  StarIcon,
  StyledButton,
  StyledComment,
  StyledList,
} from './Reviews.style';
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
const { TextArea } = Input;

const CommentForm = ({ addComment }) => {
  const [rating, setRating] = useState(0);
  const yellowStar = Array.from({ length: rating }, (v, i) => i + 1);
  const greyStar = Array.from({ length: 5 - rating }, (v, i) => i + 1);

  const handleRating = (count) => {
    console.log(count);
    setRating(count);
  };
  //   const [width, setWidth] = useState('15rem');
  //   const [form] = Form.useForm();

  //   const handleSubmit = (input) => {
  //     addComment(input);
  //     form.resetFields();
  //   };

  return (
    <StyledForm
    // form={form}
    // onFinish={handleSubmit}
    >
      <Form.Item
        name="rating"
        rules={[
          {
            required: true,
            message: '별점을 남겨주세요.',
          },
        ]}
      >
        <Header>
          <div>
            {yellowStar.map((count, i) => {
              return (
                <StarIcon
                  selected
                  key={i}
                  icon={faStar}
                  size="2x"
                  onClick={() => handleRating(count)}
                />
              );
            })}
            {greyStar.map((count, i) => {
              return (
                <StarIcon
                  key={i}
                  icon={faStar}
                  size="2x"
                  onClick={() => handleRating(count + rating)}
                />
              );
            })}
          </div>
          <div>
            <CameraIcon icon={faCamera} size="2x" />
            <StyledButton type="primary" htmlType="submit">
              등록
            </StyledButton>
          </div>
        </Header>
      </Form.Item>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: '내용을 입력해주세요.',
          },
        ]}
      >
        <TextArea placeholder="후기를 작성해주세요." rows={4} allowClear />
        {/* <StyledInput
          width={width}
          onMouseOver={() => setWidth('23rem')}
          onMouseLeave={() => setWidth('15rem')}
        /> */}
      </Form.Item>
    </StyledForm>
  );
};

export default CommentForm;
