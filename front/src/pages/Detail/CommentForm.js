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
import { commentService } from 'service/comments.js';
// import { getComment } from 'redux/ducks/comment';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Rating from 'components/Rating';

const { TextArea } = Input;

const CommentForm = ({ getCafeComments }) => {
  const [uploadVisible, setUploadVisible] = useState(true);
  // const dispatch = useDispatch();

  let { id } = useParams();

  const cafe_id = parseInt(id);
  const user_id = 1;

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
    const { star, content, image } = value;
    addComment({
      star: star,
      content: content,
      img_path: image ? image.file.response.url : '',
      cafe_id,
      user_id,
    });
    setUploadVisible(true);
    form.resetFields();
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
          <Rating form={form} />
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

// import React, { useState } from 'react';
// import { Form, Input, message, Upload } from 'antd';
// import {
//   StyledForm,
//   CameraIcon,
//   Header,
//   StyledButton,
//   UploadBox,
// } from './CommentForm.style';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { useParams } from 'react-router-dom';
// import Rating from 'components/Rating';
// import axios from 'axios';
// const { TextArea } = Input;

// const CommentForm = () => {
//   const [uploadVisible, setUploadVisible] = useState(true);
//   const [image, setImage] = useState(null);

//   // const dispatch = useDispatch();

//   let { id } = useParams();
//   const cafe_id = parseInt(id);

//   const [form] = Form.useForm();

//   const fileChangedHandler = (e) => {
//     const files = e.target.files;
//     console.log('files', files);
//     setImage(files);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();

//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };

//     formData.append('star', form.getFieldValue('star'));
//     formData.append('content', form.getFieldValue('content'));
//     formData.append('image', image[0]);
//     console.log('star', form.getFieldValue('star'));

//     const res = await axios.post(
//       `http://localhost:4000/comments`,
//       formData,
//       config
//     );
//     for (var key of formData.entries()) {
//       console.log(key[0] + ', ' + key[1]);
//     }
//     console.log('img-post-res', res);
//   };

//   return (
//     <StyledForm form={form}>
//       <Header>
//         <Form.Item
//           name="star"
//           rules={[
//             {
//               required: true,
//               message: '별점을 남겨주세요.',
//             },
//           ]}
//         >
//           <Rating
//             form={form}
//           />
//         </Form.Item>

//         <UploadBox>
//           <Form.Item name="image">
//             <input type="file" multiple onChange={fileChangedHandler} />
//             {/* {uploadVisible && <CameraIcon icon={faCamera} size="2x" />} */}
//           </Form.Item>
//           <StyledButton onClick={handleSubmit}>등록</StyledButton>
//         </UploadBox>
//       </Header>

//       <Form.Item
//         name="content"
//         rules={[
//           {
//             required: true,
//             message: '내용을 입력해주세요.',
//           },
//         ]}
//       >
//         <TextArea placeholder="후기를 작성해주세요." rows={4} allowClear />
//       </Form.Item>
//     </StyledForm>
//   );
// };

// export default CommentForm;
