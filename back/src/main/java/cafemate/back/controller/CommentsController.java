package cafemate.back.controller;

import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.dto.comments.CommentsResponseDto;
import cafemate.back.service.CommentsService;
import cafemate.back.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentsController {

    private final CommentsService commentsService;
    private final UsersService usersService;

    // C 리뷰 등록
    @PostMapping("/comments")
    public void saveComment(@RequestBody  @Validated CommentsRequestDto comment) {
        commentsService.createComment(comment);
    }

    // U 리뷰 수정
    @PatchMapping ("/comments/{rno-id}")
        public void updateComment(
                @PathVariable(value = "rno-id") Integer commentId,
                @RequestBody @Validated CommentsRequestDto comment) {
            commentsService.updateComment(commentId, comment.getContent(), comment.getStar());
    }

    // U 리뷰 삭제
    @DeleteMapping ("/comments/{rno-id}")
    public void deleteComment (@PathVariable(value = "rno-id") Integer commentId) {
        commentsService.deleteComment(commentId);
    }

//    // R 카페 리뷰 조회
//    @GetMapping("/comments/{cafe-id}")
//    public List<CommentsResponseDto> getCommentsByCafe (@PathVariable(value = "cafe-id") Integer cafeId) {
//        return commentsService.getCommentsByCafeId(cafeId);
//    }
//
//    //R 유저 리뷰 조회
//    @GetMapping("/comments/{user-id}")
//    public List<CommentsResponseDto> getCommentsByUser (@PathVariable(value = "user-id") Integer userId) {
//        usersService.validateUser(userId); //유저가 있는지 검사
//        return commentsService.getCommentsByUserId(userId);
//    }

}
