import React, { useState, useEffect } from 'react';
import { commentService } from 'service/comments';
import { Popconfirm, Avatar, message } from 'antd';
import {
  AuthorAndTime,
  AuthorName,
  BtnContainer,
  CommentContainer,
  Content,
  ContentsContainer,
  Datetime,
  Info,
  LeftBox,
  MoreBtn,
  RightBox,
  StyledButton,
  ImageContainer,
  StyledImage,
  StyledList,
} from '../../components/CommentList.style.js';
import Stars from '../../components/Stars.js';
import EditModal from '../../components/EditModal';
import { useLocation } from 'react-router-dom';
import { userService } from 'service/users.js';

const CommentList = ({
  comments,
  getCafeComments,
  getMyComments,
  userInfo,
  userLogin,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const [editComment, setEditComment] = useState({});
  const [showAllContents, setShowAllContents] = useState(false);
  const [moreId, setMoreId] = useState(undefined);
  const [commentsWithAuthor, setCommentsWithAuthor] = useState([]);

  let location = useLocation();

  console.log('comments', comments);

  useEffect(() => {
    const item = comments.find((comment) => comment.id === editId);
    setEditComment(item);
  }, [isModalVisible]);

  useEffect(() => {
    getCommentAuthor();
    console.log('commentsWithAuthor', commentsWithAuthor);
  }, [comments]);

  const updateComment = async (value) => {
    console.log('update this : ', value);
    try {
      const res = await commentService.updateComment(editComment.id, value);
      console.log('update comment result : ', res);
      if (location.pathname === '/my') {
        await getMyComments();
      } else {
        await getCafeComments();
      }
      message.success('수정되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteComment = async (id) => {
    try {
      await commentService.removeComment(id);
      if (location.pathname === '/my') {
        await getMyComments();
      } else {
        await getCafeComments();
      }
      message.success('삭제되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
  };

  const onUpdateClick = (comment) => {
    setEditId(comment.id);
    setIsModalVisible(true);
  };

  const onMoreBtnClick = (comment) => {
    setShowAllContents(true);
    setMoreId(comment.id);
  };

  const getCommentAuthor = async () => {
    try {
      let newComments = [];
      for (let i = 0; i < comments.length; i++) {
        const res = await userService.getUserById(comments[i].user_id);
        console.log('get Comment Author : ', res);
        const authorObj = {
          authorName: res.data.name,
          authorImage: res.data.img_path,
        };
        newComments.push({ ...comments[i], ...authorObj });
      }
      const sorted = newComments.reverse();
      setCommentsWithAuthor(sorted);
    } catch (e) {
      console.log(e.message);
    }
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
          dataSource={commentsWithAuthor}
          itemLayout="horizontal"
          renderItem={(comment) => (
            <CommentContainer key={comment.id}>
              <Info>
                <LeftBox>
                  <Avatar
                    size="large"
                    src={comment.authorImage}
                    alt={`${comment.authorName}'s avatar`}
                  />
                  <AuthorAndTime>
                    <AuthorName>{comment.authorName}</AuthorName>
                    <Datetime>{comment.createdAt}</Datetime>
                  </AuthorAndTime>
                </LeftBox>
                <RightBox>
                  <Stars star={comment.star} size="sm" />
                  {userLogin && userInfo.googleId === comment.user_id && (
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
                  )}
                </RightBox>
              </Info>

              <ContentsContainer
                className={comment.id === moreId && showAllContents && 'open'}
              >
                {comment.img_path !== '' && (
                  <ImageContainer>
                    <StyledImage src={comment.img_path} />
                  </ImageContainer>
                )}
                <Content
                  className={comment.id === moreId && showAllContents && 'open'}
                >
                  {comment.content}
                </Content>
                {comment.content.length > 300 && (
                  <MoreBtn
                    className={
                      comment.id === moreId && showAllContents && 'open'
                    }
                    onClick={() => onMoreBtnClick(comment)}
                  >
                    ...더보기
                  </MoreBtn>
                )}
              </ContentsContainer>
            </CommentContainer>
          )}
        />
      )}
    </>
  );
};

export default CommentList;