import React, { useState } from 'react';
import { Form, Input, message, Rate, Upload } from 'antd';
import {
  StyledForm,
  CameraIcon,
  Header,
  SubmitButton,
  UploadBox,
} from './CommentForm.style';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { commentService } from 'service/comments.js';
// import { getComment } from 'redux/ducks/comment';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const CommentForm = ({ getCafeComments, userInfo, userLogin }) => {
  const [uploadVisible, setUploadVisible] = useState(true);

  // const dispatch = useDispatch();

  let { id } = useParams();
  const cafe_id = parseInt(id);

  const [form] = Form.useForm();

  const props = {
    action: 'https://api.cloudinary.com/v1_1/dvomptrje/image/upload',
    data: { upload_preset: 'jslenlim' },
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

  const handleSubmit = (value) => {
    if (!userLogin) {
      message.warning('로그인이 필요합니다.');
      return;
    }
    const { star, content, image } = value;
    addComment({
      cafe_id,
      user_id: userInfo.googleId,
      content: content,
      img_path: image ? image.file.response.url : '',
      star: star,
    });
    setUploadVisible(true);
    form.resetFields();
  };

  const addComment = async (value) => {
    try {
      const res = await commentService.addComment(value);
      console.log('post comment result : ', res);
      message.success('작성되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
    await getCafeComments();
  };

  const showLoginWarning = () => {
    if (!userLogin) {
      message.warning('로그인이 필요합니다.');
      return;
    }
  };

  const onRateChange = (rate) => {
    form.setFieldsValue({ star: rate });
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
          <Rate allowHalf onChange={onRateChange} />
        </Form.Item>
        <UploadBox>
          <Form.Item name="image">
            {!userLogin ? (
              <CameraIcon
                onClick={showLoginWarning}
                icon={faCamera}
                size="2x"
              />
            ) : (
              <Upload {...props}>
                {uploadVisible && <CameraIcon icon={faCamera} size="2x" />}
              </Upload>
            )}
          </Form.Item>
          <SubmitButton type="primary" htmlType="submit">
            등록
          </SubmitButton>
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
        <TextArea
          placeholder="후기를 작성해주세요."
          rows={4}
          allowClear
          onClick={showLoginWarning}
        />
      </Form.Item>
    </StyledForm>
  );
};

export default CommentForm;
