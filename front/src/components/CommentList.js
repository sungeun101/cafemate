import React, { useState } from 'react';
import { Popconfirm, Button, Input, Avatar, message, Modal } from 'antd';
import {
  AuthorAndTime,
  AuthorName,
  BtnContainer,
  CommentContainer,
  Content,
  Datetime,
  Info,
  LeftBox,
  RightBox,
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
              <Info>
                <LeftBox>
                  <Avatar
                    size="large"
                    // src={comment.img_path}
                    // alt={`${comment.name}'s avatar`}
                  />
                  <AuthorAndTime>
                    <AuthorName>유저네임</AuthorName>
                    <Datetime>{comment.created_at}</Datetime>
                  </AuthorAndTime>
                </LeftBox>
                <RightBox>
                  <Stars star={comment.star} size="sm" />
                  <BtnContainer>
                    <Button
                      type="text"
                      size="small"
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
                      <Button
                        type="text"
                        size="small"
                        style={{ marginLeft: '0.4rem' }}
                      >
                        삭제
                      </Button>
                    </Popconfirm>
                  </BtnContainer>
                </RightBox>
              </Info>

              <Content>{comment.content}</Content>
            </CommentContainer>
          </>
        )}
      />
    </>
  );
};

export default CommentList;
