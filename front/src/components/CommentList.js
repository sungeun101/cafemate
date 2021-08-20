import React, { useState, useEffect } from 'react';
import { commentService } from '../service/comments';
import { Popconfirm, Button, Avatar, message } from 'antd';
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
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../redux/ducks/comment';
import EditModal from './EditModal';

const CommentList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(1);
  const [editComment, setEditComment] = useState({});

  const dispatch = useDispatch();

  const comment = useSelector((state) => state.comment.comment);

  const deleteComment = async (id) => {
    try {
      await commentService.remove(id);
    } catch (e) {
      console.log(e.message);
    }
    dispatch(getComment());
    message.success('삭제되었습니다.');
  };

  const showModal = (item) => {
    setEditId(item.id);
    setIsModalVisible(true);
  };

  const onUpdateClick = (item) => {
    showModal(item);
  };

  useEffect(() => {
    const arr = comment.filter((item) => item.id === editId);
    setEditComment(arr[0]);
  }, [isModalVisible]);

  return (
    <>
      <EditModal
        comment={editComment}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />

      <StyledList
        dataSource={comment}
        itemLayout="horizontal"
        renderItem={(item) => (
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
                    <Datetime>{item.created_at}</Datetime>
                  </AuthorAndTime>
                </LeftBox>
                <RightBox>
                  <Stars star={item.star} size="sm" />
                  <BtnContainer>
                    <Button
                      type="text"
                      size="small"
                      onClick={() => onUpdateClick(item)}
                    >
                      수정
                    </Button>
                    <Popconfirm
                      title="삭제할까요?"
                      onConfirm={() => deleteComment(item.id)}
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

              <Content>{item.content}</Content>
            </CommentContainer>
          </>
        )}
      />
    </>
  );
};

export default CommentList;
