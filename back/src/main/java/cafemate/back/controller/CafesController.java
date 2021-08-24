package cafemate.back.controller;

import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.service.CafesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CafesController {

    private final CafesService cafesService;

    // 메인페이지 검색, 다중 필터
    @GetMapping("/cafes")
    public List<CafesSearchResponseDto> getCafes(@RequestParam(value = "sorting") String sorting,
                                                @RequestParam(value = "dong") String dong,
                                                @RequestParam(value = "filtering") String filtering) {
        return cafesService.getCafesList(sorting,dong, filtering);
    }

}
