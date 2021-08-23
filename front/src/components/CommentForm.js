import React, { useState } from 'react';
import { Form, Input, message, Upload } from 'antd';
import {
  StyledForm,
  CameraIcon,
  Header,
  StyledButton,
  UploadBox,
} from './CommentForm.style';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { commentService } from '../service/comments.js';
// import { getComment } from '../redux/ducks/comment';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Rating from './Rating';

const { TextArea } = Input;

const CommentForm = ({ getCafeComments }) => {
  const [uploadVisible, setUploadVisible] = useState(true);
  const [selectedStars, setSelectedStars] = useState([]);
  // const dispatch = useDispatch();

  let { id } = useParams();
  const cafe_id = parseInt(id);

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

  const handleSubmit = (value) => {
    if (value.image) {
      addComment({
        star: value.star,
        content: value.content,
        img_path: value.image && value.image.file.response.result,
        cafe_id,
        // user_id,
      });
    } else {
      addComment({
        star: value.star,
        content: value.content,
        cafe_id,
        // user_id,
      });
    }
    setUploadVisible(true);
    form.resetFields();
    setSelectedStars([]);
  };

  const addComment = async (value) => {
    try {
      const res = await commentService.addComment(value);
      console.log('post comment result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    // dispatch(getComment());
    getCafeComments();
    message.success('작성되었습니다.');
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
