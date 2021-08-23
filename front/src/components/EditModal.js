import React, { useState, useEffect } from 'react';
import { Form, Input, message, Upload, Modal, Button } from 'antd';
import { StyledForm, CameraIcon, Header, UploadBox } from './CommentForm.style';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';

const { TextArea } = Input;

const EditModal = ({
  comment,
  isModalVisible,
  setIsModalVisible,
  updateComment,
}) => {
  const [uploadVisible, setUploadVisible] = useState(true);
  const [selectedStars, setSelectedStars] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ star: comment.star, content: comment.content });
    setSelectedStars(Array.from({ length: comment.star }, (v, i) => i + 1));
  }, [comment]);

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
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ star: comment.star, content: comment.content });
    setSelectedStars(Array.from({ length: comment.star }, (v, i) => i + 1));
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
            <Rating
              form={form}
              selectedStars={selectedStars}
              setSelectedStars={setSelectedStars}
            />
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
