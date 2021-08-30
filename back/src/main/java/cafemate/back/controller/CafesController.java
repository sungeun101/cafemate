package cafemate.back.controller;

import cafemate.back.domain.Users;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.service.CafesService;
import cafemate.back.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CafesController {

    private final CafesService cafesService;
    private final LikesService likesService;

    // 메인페이지 검색, 다중 필터
    @GetMapping("/cafes")
    public ResponseEntity<List<CafesSearchResponseDto>> getCafes(@RequestParam(value = "sorting") String sorting,
                                                                 @RequestParam(value = "dong") String dong,
                                                                 @RequestParam(value = "filtering") String filtering) {
        return new ResponseEntity<>(cafesService.getCafesList(sorting,dong, filtering ), HttpStatus.OK);
    }


    @GetMapping("/cafes/{cafe_id}")//카페 상세보기
    public ResponseEntity<?> cafeDetail(@PathVariable("cafe_id") Long cafeId, @AuthenticationPrincipal UsersResponseDto user){
        System.out.println("cafe : "+cafeId);
        System.out.println("user : "+user.getId());
        return new ResponseEntity<>(cafesService.getCafeDetail(cafeId, user.getId()), HttpStatus.OK);
    }

}
