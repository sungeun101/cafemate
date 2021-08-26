package cafemate.back.controller;

import cafemate.back.domain.Users;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
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

@RestController
@RequiredArgsConstructor
public class CafesController {

    private final CafesService cafesService;
    private final LikesService likesService;

    // 메인페이지 검색, 다중 필터
    @GetMapping("/cafes")
    public List<CafesSearchResponseDto> getCafes(@RequestParam(value = "sorting") String sorting,
                                                @RequestParam(value = "dong") String dong,
                                                @RequestParam(value = "filtering") String filtering) {
        return cafesService.getCafesList(sorting,dong, filtering);
    }


    @GetMapping("/cafes/{cafe_id}")//카페 상세보기
    public ResponseEntity<?> cafeDetail(@PathVariable("cafe_id") Long cafeId, @AuthenticationPrincipal Users user){
        System.out.println("cafe : "+cafeId);
        System.out.println("user : "+user.getId());
        return new ResponseEntity<>(cafesService.getCafeDetail(cafeId, user.getId()), HttpStatus.OK);
    }
    //
    @PostMapping("/cafes/{cafe_id}/likes")//좋아요 클릭
    public ResponseEntity<?> likes(@PathVariable("cafe_id") Long cafeId , @AuthenticationPrincipal Users user){
        System.out.println("좋아요 들어오는지");
        System.out.println("cafeId : "+cafeId);
        System.out.println("userId : "+user.getId());
//        likesService.likes(authentication.get, cafeId);

        System.out.println("좋아요 : ");
        return new ResponseEntity<>("좋아요 성공",HttpStatus.OK);
    }
    //
    @DeleteMapping("likes/users/{user_id}/{cafe_id}")//좋아요 취소
    public ResponseEntity<?> cancelLike(@AuthenticationPrincipal
                                        @PathVariable("user_id") Users user, @PathVariable("cafe_id") Long cafeId){
        System.out.println("좋아요 취소");
        System.out.println("userid : "+user.getId());
        System.out.println("cafeId : "+cafeId);
        likesService.cancelLikes(user.getId() , cafeId);
        return new ResponseEntity<>("좋아요 취소 성공",HttpStatus.OK);
    }
    //
    @GetMapping("/likes/users/{user_id}")//좋아요 리스트 불러오기
    public ResponseEntity<?> getLikesCafe(@AuthenticationPrincipal @PathVariable("user_id") Users user, @PageableDefault(size=12) Pageable pageable){
        System.out.println("user "+user.getId());
        return new ResponseEntity<>(cafesService.getLikesCafe(user.getId(), pageable), HttpStatus.OK);
    }
}
