import React, { useState } from 'react';
import { Popconfirm, Button, Input, Avatar, message, Modal } from 'antd';
import {
  BtnContainer,
  CommentContainer,
  Content,
  StyledComment,
  StyledList,
} from './CommentList.style.js';
import Stars from './Stars.js';
const { TextArea } = Input;

const CommentList = ({ comment, userObj, fetchComments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(1);

  //   const updateComment = async () => {
  //     setIsModalVisible(false);
  //     try {
  //       const res = await commentService.update({
  //         id: editId,
  //         content,
  //       });
  //       console.log(res.data);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //     await fetchComments();
  //     message.success('수정되었습니다.');
  //   };

  //   const deleteComment = async (id) => {
  //     try {
  //       await commentService.remove(id);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //     await fetchComments();
  //     message.success('삭제되었습니다.');
  //   };

  //   const showModal = (comment) => {
  //     setContent(comment.content);
  //     setEditId(comment.id);
  //     setIsModalVisible(true);
  //   };

  //   const handleCancel = () => {
  //     setIsModalVisible(false);
  //   };

  //   const onChange = (e) => {
  //     setContent(e.target.value);
  //   };

  return (
    <>
      {/* <Modal
        visible={isModalVisible}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={updateComment}>
            Save
          </Button>,
        ]}
        closable={false}
      >
        <TextArea rows={4} defaultValue={content} onChange={onChange} />
      </Modal> */}
      <StyledList
        dataSource={comment}
        itemLayout="horizontal"
        renderItem={(comment) => (
          <>
            <CommentContainer>
              <StyledComment
                avatar={
                  <Avatar
                  // src={comment.img_path}
                  // alt={`${comment.name}'s avatar`}
                  />
                }
                author={<span>유저네임</span>}
                content={<Content>{comment.content}</Content>}
                datetime={comment.created_at}
              />
              <Stars star={comment.star} />
              <BtnContainer>
                <Button
                  type="link"
                  //   onClick={() => showModal(comment)}
                >
                  수정
                </Button>
                <Popconfirm
                  title="삭제할까요?"
                  // onConfirm={() => deleteComment(comment.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link">삭제</Button>
                </Popconfirm>
              </BtnContainer>
            </CommentContainer>
          </>
        )}
      />
    </>
  );
};

export default CommentList;
