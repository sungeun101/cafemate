import React, { useState, useEffect } from 'react';
import { commentService } from 'service/comments';
import { message } from 'antd';
import { StyledList } from './CommentList.style.js';
import EditModal from './EditModal';
import Comment from './Comment'
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
  const [commentsWithAuthor, setCommentsWithAuthor] = useState([]);

  let location = useLocation();

  useEffect(() => {
    const item = comments.find((comment) => comment.id === editId);
    setEditComment(item);
  }, [isModalVisible]);

  useEffect(() => {
    getCommentAuthor();
  }, [comments]);

  const updateComment = async (value) => {
    try {
      const res = await commentService.updateComment(editComment.id, value);
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

  const getCommentAuthor = async () => {
    try {
      let newComments = [];
      for (let i = 0; i < comments.length; i++) {
        const res = await userService.getUserById(comments[i].user_id);
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
            <Comment
              comment={comment}
              getCafeComments={getCafeComments}
              getMyComments={getMyComments}
              setEditId={setEditId}
              setIsModalVisible={setIsModalVisible}
              userInfo={userInfo} userLogin={userLogin}
            />
          )}
        />
      )}
    </>
  );
};

export default CommentList;
