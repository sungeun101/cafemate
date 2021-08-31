package cafemate.back.controller;

import cafemate.back.dto.comments.CommentsRequestDto;
import cafemate.back.dto.comments.CommentsResponseDto;
import cafemate.back.service.CommentsService;
import cafemate.back.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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
    public ResponseEntity saveComment(@RequestBody @Validated CommentsRequestDto comment) {
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
    public ResponseEntity<List<CommentsResponseDto>> getCommentsByCafe (
            // @RequestParam(value = "page") Integer page,
            @PathVariable(value = "cafe-id") Long cafeId) {
        List<CommentsResponseDto> commentsList = commentsService.getCommentsByCafeId(cafeId);
//        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdAt").descending());
//        int start = (int) pageable.getOffset();
//        int end = (start + pageable.getPageSize() ) > commentsList.size() ? commentsList.size() : (start + pageable.getPageSize());
//        Page<CommentsResponseDto> commentsPage = new PageImpl<CommentsResponseDto>(commentsList.subList(start,end), pageable, commentsList.size());

        return new ResponseEntity<>(commentsList, HttpStatus.OK);
    }

    //R 유저 리뷰 조회
    @GetMapping("/comments/users/{user-id}")
    public ResponseEntity<List<CommentsResponseDto>> getCommentsByUser (
            // @RequestParam(value = "page") Integer page,
            @PathVariable(value = "user-id") String userId) {
        usersService.validateUser(userId); //유저가 있는지 검사
        List<CommentsResponseDto> commentsList = commentsService.getCommentsByUserId(userId);
//        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdAt").descending());
//
//        int start = (int) pageable.getOffset();
//        int end = (start + pageable.getPageSize() ) > commentsList.size() ? commentsList.size() : (start + pageable.getPageSize());
//        Page<CommentsResponseDto> commentsPage = new PageImpl<>(commentsList.subList(start,end), pageable, commentsList.size());
//
         return new ResponseEntity<> ( commentsList , HttpStatus.OK);
    }

}
