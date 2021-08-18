package cafemate.back.controller;

import cafemate.back.domain.Comments;
import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.dto.comments.CommentsResponseDto;
import cafemate.back.service.CommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentsController {

    private final CommentsService commentsService;

    // C 리뷰 등록
    @PostMapping("/comments")
    public void saveComment(@RequestBody @Validated CommentsRequestDto comment) {
        commentsService.createComment(comment);
    }

    // U 리뷰 수정 - 리뷰 번호로
    @PatchMapping ("/comments/{rno-id}")
        public void updateComment(
                @PathVariable(value = "rno-id") Integer commentId,
                @RequestBody @Validated CommentsRequestDto comment) {
            commentsService.updateComment(commentId, comment.getContent(), comment.getStar());
    }

    // U 리뷰 삭제 - 리뷰 번호로
    @DeleteMapping ("/comments/{rno-id}")
    public void deleteComment (@PathVariable(value = "rno-id") Integer commentId) {
        commentsService.deleteComment(commentId);
    }
//    // R 리뷰 조회 - 카페번호로 여러 리뷰
//    @GetMapping("/comments/{cafe-id}")
//     public List<CommentsDto> getCommentsByCafeId ( ) {
//      }

    // R 리뷰 조회 - 유저번호로 여러 리뷰
//    @GetMapping("/comments/{user-id}")
//     public List<CommentsDto> getCommentsByUserId ( ) {
//      }
}
