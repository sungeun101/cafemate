package cafemate.back.service;

import static org.junit.Assert.*;
import cafemate.back.domain.Comments;
import cafemate.back.repository.CommentsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CommentsServiceTest {

    @Autowired CommentsRepository commentsRepository;

    @Test //C 리뷰 쓰기
    public void 리뷰작성() throws Exception {
        //given
        String content = "댓글 내용";
        String img_path = "이미지경로";
        float star = 3.5F;
        LocalDate created_at = LocalDate.now();

        //when
        Comments comment = commentsRepository.save(Comments.builder()
                    .content(content)
                    .img_path(img_path)
                    .star(star)
                    .created_at(created_at)
                    .build());

        //then
        assertEquals(comment.getContent(), content);
        assertEquals(comment.getImg_path(), img_path);
        assertEquals(comment.getStar(), star,0.0001);
        assertEquals(comment.getCreated_at(), created_at);
    }

    @Test
    public void 리뷰수정() throws Exception {
        //given
        String originalContent = "이전 댓글 내용";
        float originalStar = 3.5F;

        String newContent = "바뀐 댓글 내용";
        float newStar = 1F;

        Comments comment = commentsRepository.save(Comments.builder()
                .content(originalContent)
                .star(originalStar)
                .created_at(LocalDate.now())
                .build());

        //when
        comment.updateContent(newContent,newStar);

        //then
        assertEquals(comment.getContent(), newContent);
        assertEquals(comment.getStar(), newStar, 0.0001);
    }

    @Test
    public void 리뷰삭제() throws Exception {
        //given
        String content = "댓글 내용";
        float star = 3.5F;
        Comments comment = commentsRepository.save(Comments.builder()
                .content(content)
                .star(star)
                .build());
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