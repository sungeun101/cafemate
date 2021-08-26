package cafemate.back.service;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE;
import static org.junit.Assert.*;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import cafemate.back.repository.CafesRepository;
import cafemate.back.repository.CommentsRepository;
import cafemate.back.repository.UsersRepository;
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

    @Autowired
    CommentsRepository commentsRepository;
    @Autowired
    CafesRepository cafesRepository;
    @Autowired
    UsersRepository usersRepository;

    //@BeforeEach
    void getCommentsList() {

        LocalDate date = LocalDate.now();
        String text = date.format(ISO_LOCAL_DATE);
        LocalDate parsedDate = LocalDate.parse(text, ISO_LOCAL_DATE);


        Comments comment = commentsRepository.save(Comments.builder()
                .content("댓글 내용")
                .img_path("이미지경로")
                .star(3.5F)
                .createdAt(parsedDate)
                .build());

        commentsRepository.save(comment);
        commentsRepository.save(comment);
        commentsRepository.save(comment);
        commentsRepository.save(comment);
    }


    @Test
    public void 리뷰작성() throws Exception {
        //given
        String content = "댓글 내용";
        String img_path = "이미지경로";
        float star = 3.5F;

        LocalDate date = LocalDate.now();
        String text = date.format(ISO_LOCAL_DATE);
        LocalDate parsedDate = LocalDate.parse(text, ISO_LOCAL_DATE);



        Users user = Users.builder().name("유저명").email("이메일").build();
        Cafes cafe = Cafes.builder().name("카페명").dong("do").address("address").build();

        //when
        Comments comment = commentsRepository.save(Comments.builder()
                    .content(content)
                    .img_path(img_path)
                    .star(star)
                    .createdAt(parsedDate)
                    .userComments(user)
                    .cafeComments(cafe)
                    .build());

        //then
        assertEquals(comment.getContent(), content);
        assertEquals(comment.getImg_path(), img_path);
        assertEquals(comment.getStar(), star,0.0001);
        assertEquals(comment.getCreatedAt(), parsedDate);
    }

    @Test
    public void 리뷰수정() throws Exception {
        //given
        String originalContent = "이전 댓글 내용";
        float originalStar = 3.5F;

        String newContent = "바뀐 댓글 내용";
        float newStar = 1F;

        LocalDate date = LocalDate.now();
        String text = date.format(ISO_LOCAL_DATE);
        LocalDate parsedDate = LocalDate.parse(text, ISO_LOCAL_DATE);


        Comments comment = commentsRepository.save(Comments.builder()
                .content(originalContent)
                .star(originalStar)
                .createdAt(parsedDate)
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
        Long commentId = comment.getId();

        //when
        commentsRepository.deleteById(commentId);
        Comments deleteComment = commentsRepository.findById(commentId).orElse(null);

        //then
        assertNull(deleteComment);
    }

//    @Test
//    public void 카페로리뷰조회() throws Exception {
//        //given
//        Cafes cafe = Cafes.builder().name("카페이름").dong("연동").address("카페주소").build();
//        cafesRepository.save(cafe);
//        Users user = Users.builder().name("유저명").email("이메일").build();
//        usersRepository.save(user);
//        Comments comments1 = Comments.builder().content("내용1").star(1F).created_at(LocalDate.now()).cafeComments(cafe).userComments(user).build();
//        Comments comments2 = Comments.builder().content("내용2").star(2F).created_at(LocalDate.now()).cafeComments(cafe).userComments(user).build();
//        Comments comments3 = Comments.builder().content("내용3").star(3F).created_at(LocalDate.now()).cafeComments(cafe).userComments(user).build();
//        commentsRepository.save(comments1);
//        commentsRepository.save(comments2);
//        commentsRepository.save(comments3);
//
//        List<Comments> commentsList = new ArrayList<>();
//        commentsList.add(comments1);
//        commentsList.add(comments2);
//        commentsList.add(comments3);
//
//        //when
//        List<Comments> getCommentsList = commentsRepository.findAllByCafesOrderByCreatedAtDesc(cafe);
//
//        //then
//        System.out.println(commentsList.get(1).getContent());
//        System.out.println(getCommentsList.get(1).getContent());
//
//    }

    
}