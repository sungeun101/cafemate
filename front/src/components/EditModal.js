import React, { useState, useEffect } from 'react';
import { Form, Input, message, Upload, Modal, Button } from 'antd';
import {
  StyledForm,
  CameraIcon,
  Header,
  StarIcon,
  UploadBox,
} from './CommentForm.style';
import { faCamera, faStar } from '@fortawesome/free-solid-svg-icons';

const { TextArea } = Input;

const EditModal = ({
  comment,
  isModalVisible,
  setIsModalVisible,
  updateComment,
}) => {
  const [uploadVisible, setUploadVisible] = useState(true);
  const [rating, setRating] = useState(comment.star);

  const [form] = Form.useForm();

  useEffect(() => {
    setRating(comment.star);
    form.setFieldsValue({ star: comment.star, content: comment.content });
  }, [comment]);

  const yellowStar = Array.from({ length: rating }, (v, i) => i + 1);
  const greyStar = Array.from({ length: 5 - rating }, (v, i) => i + 1);

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

  const handleUpdate = (value) => {
    if (value.image) {
      updateComment({
        star: value.star,
        content: value.content,
        img_path: value.image.file.response.result,
      });
    } else {
      updateComment({
        star: value.star,
        content: value.content,
      });
    }
    setUploadVisible(true);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ star: comment.star, content: comment.content });
  };

  return (
    <Modal
      forceRender
      visible={isModalVisible}
      footer={[
        <Button className="main" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          className="main-bg"
          type="submit"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                handleUpdate(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          수정
        </Button>,
      ]}
      closable={false}
    >
      <StyledForm form={form}>
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
          <TextArea rows={4} allowClear />
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};

export default EditModal;
