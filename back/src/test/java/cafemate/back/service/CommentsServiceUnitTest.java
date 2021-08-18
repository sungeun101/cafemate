package cafemate.back.service;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import cafemate.back.domain.Comments;
import cafemate.back.repository.CommentsRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
public class CommentsServiceUnitTest {

    @Mock // 유닛테스트에서의 레포지토리 : @Mock 이용
    private CommentsRepository commentsRepository;

    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // 유닛테스트에서만 사용할 Mock 데이터
    private Comments getStubComment() {
        String content = "댓글 내용입니다";
        String img_path = "이미지경로";
        float star = 3.5F;
        LocalDate created_at = LocalDate.now();

        return Comments.builder()
                .content(content)
                .img_path(img_path)
                .star(star)
                .created_at(created_at)
                .build();
    }

    @Test
    public void 리뷰작성() throws Exception {
        //given : 저장했던 엔티티(mock 데이터로 저장)와 같은 객체 반환
        Comments comment = getStubComment();
        when(commentsRepository.save(any(Comments.class))).then(AdditionalAnswers.returnsFirstArg());

        //when : save 실행 시, getStubComment()이 실행됨 => 저장한 Comments 엔티티가 리턴
        Comments savedComment = commentsRepository.save(comment);

        //then
        assertEquals(savedComment.getContent(), comment.getContent());
        assertEquals(savedComment.getImg_path(), comment.getImg_path());
        assertEquals(savedComment.getStar(), comment.getStar(),0.0001);
        assertEquals(savedComment.getCreated_at(), comment.getCreated_at());
    }

    @Test
    public void 리뷰수정() throws Exception {
        //given
        //getById(임의의 id) 실행 시 => getStubComment()리턴 => 즉, mock 데이터 반환
        when(commentsRepository.getById(any())).thenReturn(getStubComment());
        Comments comment = commentsRepository.getById(any()); //이미 있는 comments
        String newContent = "수정한 댓글 내용";
        float newStar = 2.5F;

        //when
        comment.updateContent(newContent,newStar);
        Integer commentId = comment.getId();

        //then
        assertEquals(comment, commentsRepository.getById(commentId));
        assertEquals(newContent, comment.getContent());
        assertEquals(newStar, comment.getStar(),0.0001);
    }

    @Test
    public void 리뷰삭제() throws Exception {
        //given
        when(commentsRepository.getById(any())).thenReturn(getStubComment());
        Comments comment = commentsRepository.getById(any());
        Integer commentId = comment.getId();

        //when
        commentsRepository.deleteById(commentId);
        Comments deleteComment = commentsRepository.findById(commentId).orElse(null);

        //then
        assertNull(deleteComment);
    }

//    @Test
//    public void 카페리뷰조회() throws Exception {
//
//    }
//
//    @Test
//    public void 유저리뷰조회() throws Exception {
//
//    }

}