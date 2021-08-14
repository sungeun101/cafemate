package cafemate.back.service;

import static org.junit.Assert.*;
import cafemate.back.domain.Comments;
import cafemate.back.repository.CommentsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CommentsServiceTest {

    @Autowired CommentsRepository commentsRepository;
    @Autowired CommentsService commentsService;

    @Test //C 리뷰 쓰기 (테스트용 리턴)
    @Rollback(value = false)
    public void 리뷰작성() throws Exception {
        Comments commentFirst = new Comments();
        Comments commentSecond = new Comments();

        commentFirst.setContent("first review");
        commentFirst.setCreated_at(LocalDate.now());
        commentSecond.setContent("second review");
        commentSecond.setCreated_at(LocalDate.now());

        Long saveIdFirst = commentsService.createComment(commentFirst); //저장하고 아이디 반환
        Long saveIdSecond = commentsService.createComment(commentSecond);

        assertEquals(commentFirst, commentsRepository.getById(saveIdFirst));
        assertEquals(commentSecond, commentsRepository.getById(saveIdSecond));

    }

    @Test
    @Rollback(value = false)
    public void 리뷰수정() throws Exception {
        Comments comment = commentsRepository.getById(1L);
        System.out.println(comment.getId());
        comment.setContent("change content");
    }

    @Test
    @Rollback(value = false)
    public void 리뷰삭제() throws Exception {
        commentsRepository.deleteById(2L);
    }

    @Test
    @Rollback(value = false)
    public void 카페리뷰조회() throws Exception {

    }

    @Test
    @Rollback(value = false)
    public void 유저리뷰조회() throws Exception {

    }
    
}