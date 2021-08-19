import React, { useState } from 'react';
import { Form, Input, message, Upload } from 'antd';
import {
  StyledForm,
  CameraIcon,
  Header,
  StarIcon,
  StyledButton,
  UploadBox,
} from './CommentForm.style';
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
const { TextArea } = Input;

const CommentForm = ({ addComment }) => {
  const [uploadVisible, setUploadVisible] = useState(true);
  const [rating, setRating] = useState(0);

  const yellowStar = Array.from({ length: rating }, (v, i) => i + 1);
  const greyStar = Array.from({ length: 5 - rating }, (v, i) => i + 1);
  const [form] = Form.useForm();

  const props = {
    action: '????????',
    listType: 'text',
    onChange(info) {
      if (info.file.status === 'uploading') {
        setUploadVisible(false);
      } else if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded!`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}  upload failed.`);
      }
    },
    onRemove() {
      form.resetFields(['image']);
      setUploadVisible(true);
    },
  };

  const handleRating = (count) => {
    form.setFieldsValue({ star: count });
    setRating(count);
  };

  const handleSubmit = (value) => {
    setRating(0);
    console.log(value);
    if (value.image) {
      addComment({
        star: value.star,
        content: value.content,
        // user_id, cafe_id
      });
    } else {
      addComment({
        star: value.star,
        img_path: value.image && value.image.file.response.result,
        content: value.content,
        // user_id, cafe_id
      });
    }
    setUploadVisible(true);
    form.resetFields();
  };

  return (
    <StyledForm form={form} onFinish={handleSubmit}>
      <Header>
        <Form.Item
          name="star"
          rules={[
            {
              required: true,
              message: '별점을 남겨주세요.',
            },
          ]}
        >
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
        </Form.Item>
        <UploadBox>
          <Form.Item name="image">
            <Upload {...props}>
              {uploadVisible && <CameraIcon icon={faCamera} size="2x" />}
            </Upload>
          </Form.Item>
          <StyledButton type="primary" htmlType="submit">
            등록
          </StyledButton>
        </UploadBox>
      </Header>

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