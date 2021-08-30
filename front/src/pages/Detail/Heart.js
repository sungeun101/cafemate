import React, { useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { likesService } from 'service/likes';
import { HeartIcon } from './Heart.style';
import { message } from 'antd';

const Heart = ({ likeState, cafe, userInfo, userLogin }) => {
  const [showRedHeart, setShowRedHeart] = useState(
    userLogin ? likeState : false
  );

  console.log('likeState', likeState);

  const handleLikes = async () => {
    if (!userLogin) {
      message.warning('로그인이 필요합니다.');
      return;
    }
    if (likeState) {
      RemoveFromLikes();
    } else {
      AddtoLikes();
    }
  };

  const AddtoLikes = async () => {
    try {
      const res = await likesService.addLike({
        cafe_id: cafe.id,
        user_id: userInfo.googleId,
      });
      console.log('addLike result : ', res);
      setShowRedHeart((prev) => !prev);
      message.success('찜한 카페로 등록되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
  };

  const RemoveFromLikes = async () => {
    try {
      const res = await likesService.cancelLike({
        cafe_id: cafe.id,
        user_id: userInfo.googleId,
      });
      console.log('cancelLike result : ', res);
      setShowRedHeart((prev) => !prev);
      message.success('찜한 카페에서 삭제되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <HeartIcon onClick={handleLikes} icon={showRedHeart ? faHeart : farHeart} />
  );
};

export default Heart;
