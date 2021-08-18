import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { StyledForm } from './CommentForm.style';
import {
  CameraIcon,
  Header,
  StarIcon,
  StyledButton,
} from './CommentForm.style';
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
  const [form] = Form.useForm();

  //   const handleSubmit = (input) => {
  //     addComment(input);
  //     form.resetFields();
  //   };

  return (
    <StyledForm
      form={form}
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
      </Form.Item>
    </StyledForm>
  );
};

export default CommentForm;
