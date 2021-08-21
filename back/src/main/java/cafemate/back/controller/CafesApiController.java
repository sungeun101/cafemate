package cafemate.back.controller;

import cafemate.back.auth.PrincipalDetails;
import cafemate.back.domain.Likes;
import cafemate.back.domain.Users;
import cafemate.back.dto.LikesListDto;
import cafemate.back.service.CafesService;
import cafemate.back.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CafesApiController {

    private final CafesService cafesService;
    private final LikesService likesService;

//    @PostMapping("/likes")// likes전부가져오기
//    public ResponseEntity<String> getLikes(@RequestBody UserInfo userInfo) {
//        List<Likes> likes = likesService.getLikes(userInfo.getUserId());
//
//        long cafeId = 0L;
//        if(likes.stream().findFirst().isPresent()) {
//            cafeId = likes.stream().findFirst().get().getCafeId();
//        }
//        return new ResponseEntity(cafeId, HttpStatus.OK);
//    }
//
//    @GetMapping("likes/users/{user-id}")
//    public ResponseEntity<String> MyPagelikes(@RequestBody LikesListDto likesListDto, @PathVariable("user-id") long id){
//        id = likesListDto.getId();
//        List<Likes> likes = likesService.getLikes(id);
//        return new ResponseEntity(likes,HttpStatus.OK);
//    }

    // 1. 좋아요 올려주세요.

    // 2. 좋아요 내려주세요.
    //좋아요 클릭, 취소가 안됨

    @GetMapping("/cafes/{cafe_id}")//카페 상세보기
    public ResponseEntity<?> cafeDetail(@PathVariable("cafe_id") long cafeId, @AuthenticationPrincipal Users user){
        return new ResponseEntity<>(cafesService.getCafeDetail(cafeId, user.getId()), HttpStatus.OK);
    }
//
    @PostMapping("/cafes/likes")//좋아요 클릭
    public ResponseEntity<?> likes(@AuthenticationPrincipal Users user, long cafeId){
        likesService.likes(user.getId(), cafeId);
        System.out.println("좋아요 : ");
        return new ResponseEntity<>("좋아요 성공",HttpStatus.OK);
    }
//
    @DeleteMapping("likes/users/{user_id}/{cafe_id}")//좋아요 취소
    public ResponseEntity<?> cancelLike(@AuthenticationPrincipal
                                        @PathVariable("user_id") Users user, @PathVariable("cafe_id") long cafeId){
        likesService.cancelLikes(user.getId() , cafeId);
        return new ResponseEntity<>("좋아요 취소 성공",HttpStatus.OK);
    }
//
    @GetMapping("/likes/users/{user_id}")//좋아요 리스트 불러오기
    public ResponseEntity<?> getLikesCafe(@AuthenticationPrincipal @PathVariable("user_id") Users user, @PageableDefault(size=12) Pageable pageable){
        return new ResponseEntity<>(cafesService.getLikesCafe(user.getId(), pageable), HttpStatus.OK);
    }
}
