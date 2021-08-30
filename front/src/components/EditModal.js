import React, { useState, useEffect } from 'react';
import { Form, Input, message, Upload, Modal, Button } from 'antd';
import {
  StyledForm,
  CameraIcon,
  Header,
  UploadBox,
} from 'pages/Detail/CommentForm.style';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Rating from './Rating';

const { TextArea } = Input;

const EditModal = ({
  comment,
  isModalVisible,
  setIsModalVisible,
  updateComment,
}) => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [form] = Form.useForm();
  const { star, content, img_path } = comment;

  useEffect(() => {
    form.setFieldsValue({ star, content, image: img_path });
    setUploadVisible(true);
  }, [comment]);

  const props = {
    action: 'https://api.cloudinary.com/v1_1/dvomptrje/image/upload',
    data: { upload_preset: 'jslenlim' },
    listType: 'picture',
    maxCount: 1,
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
      form.setFieldsValue({ image: '' });
      setUploadVisible(true);
    },
  };

  const handleUpdate = (value) => {
    console.log('value', value);
    const { star, content, image } = value;
    if (img_path === '') {
      updateComment({
        star,
        content,
        img_path: image === '' ? '' : image.file.response.url,
      });
    } else {
      updateComment({
        star,
        content,
        img_path: image === '' ? '' : image,
      });
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({
      star,
      content,
      image: img_path || '',
    });
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
            <Rating form={form} />
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
