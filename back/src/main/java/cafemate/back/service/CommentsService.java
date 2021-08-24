package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.dto.comments.CommentsResponseDto;
import cafemate.back.repository.CafesRepository;
import cafemate.back.repository.CommentsRepository;
import cafemate.back.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentsService {

    private final CommentsRepository commentsRepository;
    private final UsersRepository usersRepository;
    private final CafesRepository cafesRepository;
    private final CafesService cafesService;

    // C 리뷰 쓰기
    public void createComment(CommentsRequestDto commentsRequestDto) {
        String content = commentsRequestDto.getContent();
        String img_path = commentsRequestDto.getImg_path();
        float star = commentsRequestDto.getStar();


        Comments comment = Comments.builder()
                        .content(content)
                        .img_path(img_path)
                        .star(star)
                        .created_at(LocalDate.now())
                        .build();
        commentsRepository.save(comment);
        //cafesService.updateStar( comment.getCafe().getId(),commentsRequestDto.getStar());
    }

    // U 리뷰 수정
    public void updateComment (Integer commentId, String newContent, float newStar) {
        Comments comment = commentsRepository.getById(commentId);
        comment.updateContent(newContent, newStar);
        comment.updateDate();
        //cafesService.updateStar( comment.getCafe().getId(),comment.getStar());
    }

    //D 리뷰 삭제
    public void deleteComment(Integer commentId) {
        commentsRepository.deleteById(commentId);
    }

    //R 카페 리뷰 조회
//    @Transactional(readOnly = true)
//    public List<CommentsResponseDto> getCommentsByCafeId (Integer cafeId) {
//        Cafes cafe = cafesRepository.getById(cafeId);
//        List<Comments> commentsList = commentsRepository.findAllByCafeOrderByCreatedAtDesc(cafe);
//        return commentsList.stream().map(CommentsResponseDto::new).collect(Collectors.toList());
//    }
//
//    //R 유저 리뷰 조회
//    @Transactional(readOnly = true)
//    public List<CommentsResponseDto> getCommentsByUserId (Integer userId) {
//        Users user = usersRepository.getById(userId);
//        List<Comments> commentsList = commentsRepository.findAllByUserOrderByCreatedAtDesc(user);
//        return commentsList.stream().map(CommentsResponseDto::new).collect(Collectors.toList());
//    }

}
