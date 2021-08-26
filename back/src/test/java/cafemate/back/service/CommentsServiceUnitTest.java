package cafemate.back.service;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import cafemate.back.repository.CommentsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith(MockitoExtension.class)
public class CommentsServiceUnitTest {

    @Mock // 유닛테스트에서의 레포지토리 : @Mock 이용
    private CommentsRepository commentsRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // 유닛테스트에서만 사용할 Mock 데이터
    private Comments getStubComment() {
        String content = "댓글 내용입니다";
        String img_path = "이미지경로";
        float star = 3.5F;
        LocalDate createdAt = LocalDate.now();

        return Comments.builder()
                .content(content)
                .img_path(img_path)
                .star(star)
                .createdAt(createdAt)
                .build();
    }

    private List<Comments> getStubCommentList() {
        List<Comments> commentsList = new ArrayList<>();
        Comments comment1 = Comments.builder().content("content1").img_path("img_path").star(1F).createdAt(LocalDate.now()).build();
        Comments comment2 = Comments.builder().content("content2").img_path("img_path").star(2F).createdAt(LocalDate.now()).build();
        Comments comment3 = Comments.builder().content("content3").img_path("img_path").star(3F).createdAt(LocalDate.now()).build();

        commentsList.add(comment1);
        commentsList.add(comment2);
        commentsList.add(comment3);

        return commentsList;
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
        assertEquals(savedComment.getCreatedAt(), comment.getCreatedAt());
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
        Long commentId = comment.getId();

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
        Long commentId = comment.getId();

        //when
        commentsRepository.deleteById(commentId);
        Comments deleteComment = commentsRepository.findById(commentId).orElse(null);

        //then
        assertNull(deleteComment);
    }

    @Test
    public void 카페리뷰조회() throws Exception {
        //given
        when(commentsRepository.findAllByCafesOrderByCreatedAtDesc(any(Cafes.class)))
                .thenReturn(getStubCommentList());

        //when
        List<Comments> commentsList = getStubCommentList();

        //then

        assertEquals(commentsList.size(), getStubCommentList().size());
        assertEquals(commentsList.get(1).getContent(), getStubCommentList().get(1).getContent());
    }

    @Test
    public void 유저리뷰조회() throws Exception {
        //given
        when(commentsRepository.findAllByUsersOrderByCreatedAtDesc(any(Users.class)))
                .thenReturn(getStubCommentList());

        //when
        List<Comments> commentsList = getStubCommentList();

        //then

        assertEquals(commentsList.size(), getStubCommentList().size());
        assertEquals(commentsList.get(1).getContent(), getStubCommentList().get(1).getContent());
    }

}