package cafemate.back.service;

import cafemate.back.domain.Comments;
import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.repository.CommentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentsService {

    private final CommentsRepository commentsRepository;

    // C 리뷰 쓰기
    public void createComment(CommentsRequestDto commentsRequestDto) {
        //Dto -> Entity
        String content = commentsRequestDto.getContent();
        String img_path = commentsRequestDto.getImg_path();
        float star = commentsRequestDto.getStar();

        commentsRepository.save(
                Comments.builder()
                        .content(content)
                        .img_path(img_path)
                        .star(star)
                        .created_at(LocalDate.now())
                        .build()
        );
    }

    // U 리뷰 수정
    public void updateComment (Integer commentId, String newContent, float newStar) {
        Comments comment = commentsRepository.getById(commentId);
        comment.updateContent(newContent, newStar);
        comment.updateDate();
    }

    //D 리뷰 삭제
    public void deleteComment(Integer commentId) {
        commentsRepository.deleteById(commentId);
    }

//    //조회 : Entity -> Dto
//
//    //R 카페 리뷰 조회 - 카페번호로 전체 조회
//    @Transactional(readOnly = true)
//    public List<Comments> showCommentsByCafeId (Integer cafeId) {
//        return commentsRepository.findAllById(cafeId);
//    }
//
//    //R 유저 리뷰 조회 - 유저번호로 전체 조회
//    @Transactional(readOnly = true)
//    public List<Comments> showCommentsByUserId (Integer userId) {
//        return commentsRepository.findAllById(userId);
//    }

}
