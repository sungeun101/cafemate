package cafemate.back.service;

import cafemate.back.domain.Comments;
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

    // C 리뷰 쓰기 (테스트용 리턴)
    public Long createComment(Comments comment) {
        commentsRepository.save(comment);
        return comment.getId();
    }

    //R 카페 리뷰 조회 - 카페번호로 전체 조회
    @Transactional(readOnly = true)
    public List<Comments> showCommentsByCafeId (Long cafeId) {
        return commentsRepository.findAllById(cafeId);
    }

    //R 유저 리뷰 조회 - 유저번호로 전체 조회
    @Transactional(readOnly = true)
    public List<Comments> showCommentsByUserId (Long userId) {
        return commentsRepository.findAllById(userId);
    }

    // U 리뷰 수정
    public Comments updateComment (Long commentId, String newContent) {
        Comments comment = commentsRepository.getById(commentId);
        comment.setContent(newContent); //setter 함수 취소
        comment.setCreated_at(LocalDate.now());
        return comment;
    }

    //D 리뷰 삭제 (테스트용 리턴)
    public Long deleteComment(Long commentId) {
        commentsRepository.deleteById(commentId);
        return commentId;
    }
}
