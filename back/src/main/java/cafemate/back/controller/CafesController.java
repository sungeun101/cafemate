package cafemate.back.controller;

import cafemate.back.domain.Likes;
import cafemate.back.domain.Users;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.dto.likes.LikesListDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.service.CafesService;
import cafemate.back.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class CafesController {

    private final CafesService cafesService;
    private final LikesService likesService;

    // 메인페이지 검색, 다중 필터
    @GetMapping("/cafes")
    public ResponseEntity<Page<CafesSearchResponseDto>> getCafes(@RequestParam(value = "sorting") String sorting,
                                                                 @RequestParam(value = "dong") String dong,
                                                                 @RequestParam(value = "filtering") String filtering,
                                                                 @RequestParam(value = "page") Integer page) {

        List<CafesSearchResponseDto> cafesList = cafesService.getCafesList(sorting, dong, filtering);
        Pageable pageable = PageRequest.of(page, 10, Sort.unsorted());

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize() ) > cafesList.size() ? cafesList.size() : (start + pageable.getPageSize());
        Page<CafesSearchResponseDto> cafesPage = new PageImpl<>(cafesList.subList(start,end), pageable, cafesList.size());

        return new ResponseEntity<>( cafesPage ,HttpStatus.OK);
    }


    @GetMapping("/cafes/{cafe_id}")//카페 상세보기
    public ResponseEntity<?> cafeDetail(@PathVariable("cafe_id") Long cafeId, @AuthenticationPrincipal UsersResponseDto user){
        return new ResponseEntity<>(cafesService.getCafeDetail(cafeId, user.getId()), HttpStatus.OK);
    }

}
