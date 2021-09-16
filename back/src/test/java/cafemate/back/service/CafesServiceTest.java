package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import cafemate.back.dto.cafes.CafesResponseDto;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.repository.CafesRepository;
import cafemate.back.repository.CommentsRepository;
import cafemate.back.repository.UsersRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CafesServiceTest {
    @Autowired
    CafesRepository cafesRepository;

    @Autowired
    CommentsRepository commentsRepository;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    CafesService cafesService;

    @Test
    //@Rollback(value = false)
    public void 카페조회() throws Exception {
        //given : Cafes 테이블은 미리 저장되어있고 새로 저장X -> builder가 불필요하나, 테스트용으로 만듦
        Cafes cafe1 = Cafes.builder().id(1L).name("주차안되는 카페").dong("삼양동").longitude(11F).latitude(11F).address("카페주소").star(1F).parking(false).phone("1").build();
        Cafes cafe2 = Cafes.builder().id(2L).name("주차가능 카페 별점2").dong("삼양동").longitude(11F).latitude(11F).address("카페주소").star(2F).parking(true).phone("1").build();
        Cafes cafe3 = Cafes.builder().id(3L).name("주차가능 카페 별점3").dong("삼양동").longitude(11F).latitude(11F).address("카페주소").star(3F).parking(true).phone("1").build();

        List<Cafes> createCafeList = new ArrayList<>();
        createCafeList.add(cafe1);
        createCafeList.add(cafe2);
        createCafeList.add(cafe3);
        List<CafesSearchResponseDto> createCafeListDto = createCafeList.stream().map(CafesResponseDto::new).map(CafesSearchResponseDto::new).collect(Collectors.toList());

        //when
        cafesRepository.save(cafe1);
        cafesRepository.save(cafe2);
        cafesRepository.save(cafe3);
        List<Cafes> cafesList = cafesRepository.findAllByDong("삼양동");
        List<CafesResponseDto> findCafesList = cafesList.stream().map(CafesResponseDto::new).collect(Collectors.toList());
        List<CafesSearchResponseDto> getCafesList = findCafesList.stream().map(CafesSearchResponseDto::new).collect(Collectors.toList());

        //then (Rollback 지우고)
        assertEquals(createCafeListDto.size(), getCafesList.size());
    }

}
