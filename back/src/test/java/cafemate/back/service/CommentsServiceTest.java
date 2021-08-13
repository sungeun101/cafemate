package cafemate.back.service;

import cafemate.back.domain.Comments;
import cafemate.back.repository.CommentsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

//@WebAppConfiguration
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations="applicationContext.xml")
//@SpringBootTest
//@Transactional

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CommentsServiceTest {

        @Autowired CommentsRepository commentsRepository;
        @Autowired CommentsService commentsService;

    @Test
    public void createComment() throws Exception {

        Comments comment = new Comments();
        comment.setContent("hi");

        int saveId = commentsService.createComment(comment);

        assertEquals(comment, commentsRepository.findOne(saveId));
        //assertEquals(comment, commentsRepository.findOne(saveId));

    }
}