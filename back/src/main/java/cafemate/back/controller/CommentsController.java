package cafemate.back.controller;

import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.dto.comments.CommentsResponseDto;
import cafemate.back.service.CommentsService;
import cafemate.back.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity saveComment(@RequestBody  @Validated CommentsRequestDto comment) {
        commentsService.createComment(comment);
        return new ResponseEntity(HttpStatus.OK);
    }

    // U 리뷰 수정
    @PatchMapping ("/comments/{rno-id}")
    public ResponseEntity updateComment(
            @PathVariable(value = "rno-id") Long commentId,
            @RequestBody @Validated CommentsRequestDto comment) {
        commentsService.updateComment(commentId, comment.getContent(), comment.getStar());
        return new ResponseEntity(HttpStatus.OK);
    }

    // U 리뷰 삭제
    @DeleteMapping ("/comments/{rno-id}")
    public ResponseEntity deleteComment (@PathVariable(value = "rno-id") Long commentId) {
        commentsService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.OK);
    }

    // R 카페 리뷰 조회
    @GetMapping("/comments/{cafe-id}")
    public ResponseEntity<List<CommentsResponseDto>> getCommentsByCafe (@PathVariable(value = "cafe-id") Long cafeId) {
        return new ResponseEntity<>(commentsService.getCommentsByCafeId(cafeId), HttpStatus.OK);
    }

    //R 유저 리뷰 조회
    @GetMapping("/comments/{user-id}")
    public ResponseEntity<List<CommentsResponseDto>> getCommentsByUser (@PathVariable(value = "user-id") Long userId) {
        usersService.validateUser(userId); //유저가 있는지 검사
        return new ResponseEntity<> (commentsService.getCommentsByUserId(userId), HttpStatus.OK);
    }

}
