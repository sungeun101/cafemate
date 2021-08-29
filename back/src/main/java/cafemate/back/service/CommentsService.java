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
import java.util.Optional;
import java.util.stream.Collectors;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE;

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

        Users user = usersRepository.getById(commentsRequestDto.getUser_id());
        Cafes cafe = cafesRepository.getById(commentsRequestDto.getCafe_id());

        String content = commentsRequestDto.getContent();
        String img_path = commentsRequestDto.getImg_path();
        float star = commentsRequestDto.getStar();

        LocalDate date = LocalDate.now();
        String text = date.format(ISO_LOCAL_DATE);
        LocalDate parsedDate = LocalDate.parse(text, ISO_LOCAL_DATE);

        Comments comment = Comments.builder()
                        .content(content)
                        .img_path(img_path)
                        .star(star)
                        .userComments(user)
                        .cafeComments(cafe)
                        .createdAt(parsedDate)
                        .build();
        commentsRepository.save(comment);
        cafesService.updateStar(comment.getCafes().getId(),commentsRequestDto.getStar());
    }

    // U 리뷰 수정
    public void updateComment (Long commentId, String newContent, float newStar) {
        Comments comment = commentsRepository.getById(commentId);
        comment.updateContent(newContent, newStar);
        comment.updateDate();
        cafesService.updateStar( comment.getCafes().getId(),comment.getStar());
    }

    //D 리뷰 삭제
    public void deleteComment(Long commentId) {
        commentsRepository.deleteById(commentId);
    }

    //R 카페 리뷰 조회
    @Transactional(readOnly = true)
    public List<CommentsResponseDto> getCommentsByCafeId (Long cafeId) {
        Cafes cafe = cafesRepository.getById(cafeId);
        List<Comments> commentsList = commentsRepository.findAllByCafesOrderByCreatedAtDesc(cafe);
        return commentsList.stream().map(CommentsResponseDto::new).collect(Collectors.toList());
    }

    //R 유저 리뷰 조회
    @Transactional(readOnly = true)
    public List<CommentsResponseDto> getCommentsByUserId (String userId) {
        Users user = usersRepository.getById(userId);
        List<Comments> commentsList = commentsRepository.findAllByUsersOrderByCreatedAtDesc(user);
        return commentsList.stream().map(CommentsResponseDto::new).collect(Collectors.toList());
    }

}
