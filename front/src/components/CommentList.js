import React, { useState, useEffect } from 'react';
import { commentService } from 'service/comments';
import { Popconfirm, Avatar, message } from 'antd';
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
  StyledButton,
  StyledList,
} from './CommentList.style.js';
import Stars from './Stars.js';
// import { useDispatch } from 'react-redux';
// import { getComment } from 'redux/ducks/comment';
import EditModal from './EditModal';
import { useLocation } from 'react-router-dom';

const CommentList = ({ comments, getCafeComments, getMyComments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const [editComment, setEditComment] = useState({});

  let location = useLocation();

  // const dispatch = useDispatch();

  useEffect(() => {
    const item = comments.find((comment) => comment.id === editId);
    setEditComment(item);
  }, [isModalVisible]);

  const updateComment = async (value) => {
    console.log('update this : ', value);
    try {
      const res = await commentService.updateComment(editComment.id, value);
      console.log('update comment : ', res.data);
    } catch (e) {
      console.log(e.message);
    }
    // dispatch(getComment());
    if (location.pathname === '/my') {
      getMyComments();
    } else {
      getCafeComments();
    }
    message.success('수정되었습니다.');
  };

  const deleteComment = async (id) => {
    try {
      await commentService.removeComment(id);
    } catch (e) {
      console.log(e.message);
    }
    // dispatch(getComment());
    if (location.pathname === '/my') {
      getMyComments();
    } else {
      getCafeComments();
    }
    message.success('삭제되었습니다.');
  };

  const onUpdateClick = (comment) => {
    setEditId(comment.id);
    setIsModalVisible(true);
  };

  return (
    <>
      {editComment && (
        <EditModal
          comment={editComment}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          updateComment={updateComment}
        />
      )}

      {comments.length > 0 && (
        <StyledList
          dataSource={comments}
          itemLayout="horizontal"
          renderItem={(comment) => (
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
                    <StyledButton
                      type="text"
                      size="small"
                      onClick={() => onUpdateClick(comment)}
                    >
                      수정
                    </StyledButton>
                    <Popconfirm
                      title="삭제할까요?"
                      onConfirm={() => deleteComment(comment.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <StyledButton type="text" size="small">
                        삭제
                      </StyledButton>
                    </Popconfirm>
                  </BtnContainer>
                </RightBox>
              </Info>

              <Content>{comment.content}</Content>
            </CommentContainer>
          )}
        />
      )}
    </>
  );
};

export default CommentList;
