package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.dto.cafes.CafesResponseDto;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.repository.CafesRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CafesServiceUnitTest {

    @Mock // 유닛테스트에서의 레포지토리 : @Mock 이용
    private CafesRepository cafesRepository;

    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // 유닛테스트에서만 사용할 Mock 데이터
    private List<Cafes> getStubCafesList() {
        //원래 Cafes는 미리 저장되어있는 데이터라 builder도 필요없으나, 테스트를 위해 만듦.
        List<Cafes> cafesList = new ArrayList<>();
        Cafes cafe1 = Cafes.builder().name("카페1").dong("연동").address("카페주소").build();
        Cafes cafe2 = Cafes.builder().name("카페2").dong("연동").address("카페주소").build();
        Cafes cafe3 = Cafes.builder().name("카페3").dong("연동").address("카페주소").build();
        cafesList.add(cafe1);
        cafesList.add(cafe2);
        cafesList.add(cafe3);

        return cafesList;
    }


    @Test
    public void 카페조회() throws Exception {
        //given
        when(cafesRepository.findAllByDong(any())).thenReturn(getStubCafesList());

        //when : Cafe -> CafesResponseDto -> CafesSearchResponseDto
        List<Cafes> cafesList = cafesRepository.findAllByDong(any());
        List<CafesResponseDto> findCafesList = cafesList.stream().map(CafesResponseDto::new).collect(Collectors.toList());
        List<CafesSearchResponseDto> getCafesList = findCafesList.stream().map(CafesSearchResponseDto::new).collect(Collectors.toList());

        //then
        assertEquals(getCafesList.size(), getStubCafesList().size());
        assertEquals(getCafesList.get(1).getName(), getStubCafesList().get(1).getName());
    }



}

