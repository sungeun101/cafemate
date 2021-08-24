package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.dto.cafes.CafesResponseDto;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.repository.CafesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CafesService {

    private final CafesRepository cafesRepository;

//    public void updateStar (Integer commentId, float newStar) {
//        Cafes cafe = cafesRepository.getById(commentId);
//        cafe.updateStar(newStar);
//    }

    public List<CafesSearchResponseDto> getCafesList (String sorting, String dong, String filtering) {
        // 1. 선택한 동네의 모든 Cafes 리스트 가져오기
        List<Cafes> cafesListEntity = cafesRepository.findAllByDong(dong);

        // 2. 엔티티 리스트를 DTO 리스트로 변환하는 과정 (DTO 리스트에는 int형 priorty 변수를 추가함 -> 1차 정렬에 활용하기 위해)
        List<CafesResponseDto> cafesListDto =
                cafesListEntity.stream().map(CafesResponseDto::new).collect(Collectors.toList());

        //3. 필터링 (1,2차) - 우선 순위
        boolean parking = checkFilter(filtering, "parking");
        boolean wifi = checkFilter(filtering, "wifi");
        if (parking) subtractFiltering(filtering, "parking");
        if (wifi) subtractFiltering(filtering, "wifi");

        String[] categoryArr = {"work" , "chat" , "camera" , "roasting" , "clean" , "dessert" };
        String[] dessertArr = {"macaron", "ice", "honey", "cafe", "smoothie", "milktea", "ade", "sandwich", "icedtea", "waffle", "cropple", "scone", "bagel"};

        for (CafesResponseDto i :cafesListDto) {
            if(parking==i.isParking()) {
                i.setPriority(i.getPriority()+1);
            }
            if(wifi==i.isWifi()) {
                i.setPriority(i.getPriority()+1);
            }
            if (filtering.contains("four")) {
                filtering.replace("four", "");
                if (i.getAmericano()>4000) {
                    i.setPriority(i.getPriority()+1);
                }
            } else if (filtering.contains("six")) {
                filtering.replace("six", "");
                if (i.getAmericano()>6000) {
                    i.setPriority(i.getPriority()+1);
                }
            } else if (filtering.contains("over")) {
                filtering.replace("over", "");
                i.setPriority(i.getPriority()+1);
            }
            for (String cate : categoryArr) {
                if (filtering.contains(cate)) {
                    i.setPriority(i.getPriority()+1);
                }
            }
            for (String dessert : dessertArr) {
                if (filtering.contains(dessert)) {
                    i.setPriority(i.getPriority()+1);
                }
            }
        }
        // 4. 정렬
        if (sorting.equals("star")) {
            return cafesListDto.stream()
                    .sorted(Comparator.comparingInt(CafesResponseDto::getPriority)
                            .thenComparingInt(CafesResponseDto::getStar).reversed())
                    .map(CafesSearchResponseDto::new)
                    .collect(Collectors.toList());
        }  else {
            return cafesListDto.stream()
                    .sorted(Comparator.comparingInt(CafesResponseDto::getPriority)
                            .thenComparingInt(CafesResponseDto::getAmericano).reversed())
                    .map(CafesSearchResponseDto::new)
                    .collect(Collectors.toList());
        }
    }

    public Boolean checkFilter(String filtering, String column) {
        if (filtering.contains(column)) {
            return true;
        } else return false;
    }

    public String subtractFiltering (String filtering, String column) {
        return filtering.replace(column, "");
    }

}




