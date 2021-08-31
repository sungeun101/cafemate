import React, { useEffect, useState } from 'react'
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
  } from './CommentList.style.js';
import Stars from './Stars.js';
import { withRouter } from 'react-router-dom';
import { cafeService } from 'service/cafes';

const Comment = (props) => {
    const [showAllContents, setShowAllContents] = useState(false);
    const [moreId, setMoreId] = useState(undefined);
    const [cafe, setCafe] = useState({})
    const { comment, getCafeComments, getMyComments, setEditId, setIsModalVisible, userInfo, userLogin } = props

    useEffect( async () => {
        try {
            const res = await cafeService.getCafeById(comment.cafe_id);
            setCafe(res.data)
        } catch (e) {
            console.log(e.message)
        }
    })

    const deleteComment = async (id) => {
        try {
          await commentService.removeComment(id);
          if (props.location.pathname === '/my') {
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

    const onCafeClick = () => {
        props.history.push({
          pathname: `/detail/${cafe.id}`
        });
    };

    return (
        <CommentContainer key={comment.id}>
              <Info>
                <LeftBox>
                  <Avatar
                    size="large"
                    src={cafe.img_path ? `http://${cafe.img_path}` : "https://1.bp.blogspot.com/-ZO8wGSRzFBA/YSnWa5QV6ZI/AAAAAAAAD-Y/3n5lSJwrx-Yh3McA1GpGCg6POSjrvsPPwCLcBGAsYHQ/s800/noimage.png"}
                    alt={`${cafe.name}`}
                  />
                  <AuthorAndTime>
                    <AuthorName onClick={() => onCafeClick()}>{cafe.name}</AuthorName>
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
    )
}

export default withRouter(Comment)