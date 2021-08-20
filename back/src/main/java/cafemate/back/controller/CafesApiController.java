package cafemate.back.controller;

import cafemate.back.domain.Users;
import cafemate.back.service.CafesService;
import cafemate.back.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RequiredArgsConstructor
@RestController
public class CafesApiController {

    private final CafesService cafesService;
    private final LikesService likesService;

    @GetMapping("/cafes/{cafe-id}")//카페 상세보기
    public ResponseEntity<?> cafeDetail(@PathVariable("cafe-id") long cafeId, @AuthenticationPrincipal Users user){
        return new ResponseEntity<>(cafesService.getCafeDetail(cafeId, user.getId()), HttpStatus.OK);
    }

    @PostMapping("/likes/users")//좋아요 클릭
    public ResponseEntity<?> likes(@AuthenticationPrincipal Users user, long cafeId){
        likesService.likes(user.getId(), cafeId);
        return new ResponseEntity<>("좋아요 성공",HttpStatus.OK);
    }

    @DeleteMapping("likes/users/{user-id}/{cafe-id}")//좋아요 취소
    public ResponseEntity<?> cancelLike(@AuthenticationPrincipal
                                        @PathVariable("user-id") Users user, @PathVariable("cafe-id") long cafeId){
        likesService.cancelLikes(user.getId() , cafeId);
        return new ResponseEntity<>("좋아요 취소 성공",HttpStatus.OK);
    }

    @GetMapping("/likes/users/{user-id}")//좋아요 리스트 불러오기
    public ResponseEntity<?> getLikesCafe(@AuthenticationPrincipal Users user, @PageableDefault(size=12) Pageable pageable){
        return new ResponseEntity<>(cafesService.getLikesCafe(user.getId(), pageable), HttpStatus.OK);
    }


}
