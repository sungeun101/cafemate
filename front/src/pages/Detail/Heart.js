import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { likesService } from 'service/likes';
import { HeartIcon } from './Heart.style';
import { message } from 'antd';

const Heart = ({ liked, setLiked, cafe }) => {
  const user_id = 1;

  const handleLikes = async () => {
    console.log('heart cafe', cafe);
    setLiked((prev) => !prev);
    if (!liked) {
      AddtoLikes();
    } else {
      RemoveFromLikes();
    }
  };

  const AddtoLikes = async () => {
    try {
      const res = await likesService.addLike({
        // cafe_id: cafe.id,
        id: cafe.id,
        user_id,
      });
      console.log('addLike result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    message.success('찜한 카페로 등록되었습니다.');
  };

  const RemoveFromLikes = async () => {
    try {
      const res = await likesService.cancelLike({
        //   cafe_id: cafe.id,
        id: cafe.id,
        user_id,
      });
      console.log('cancelLike result : ', res);
    } catch (e) {
      console.log(e.message);
    }
    message.success('찜한 카페에서 삭제되었습니다.');
  };

  return <HeartIcon onClick={handleLikes} icon={liked ? faHeart : farHeart} />;
};

export default Heart;
