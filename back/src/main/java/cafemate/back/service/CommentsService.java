package cafemate.back.service;

import cafemate.back.domain.Comments;
import cafemate.back.repository.CommentsRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentsService {


    private final CommentsRepository commentsRepository;

    //리뷰 저장
    public int createComment(Comments comment) {
        commentsRepository.save(comment);
        return comment.getId(); //
    }


    //리뷰 조회 - 카페번호로 예시는 컨텐스 검색..수정하기
    @Transactional(readOnly = true)
    public List<Comments> showComments (String content) {
        return commentsRepository.findByContent(content);
    }
}
