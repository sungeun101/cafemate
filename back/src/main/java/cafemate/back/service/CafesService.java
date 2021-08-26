package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.dto.cafes.CafeDetailInfoDto;
import cafemate.back.dto.cafes.CafesResponseDto;
import cafemate.back.dto.cafes.CafesSearchResponseDto;
import cafemate.back.dto.likes.LikesListDto;
import cafemate.back.repository.CafesRepository;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.swing.text.html.parser.Entity;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import org.qlrm.mapper.JpaResultMapper;
import javax.persistence.Query;

@Service
@Transactional
@RequiredArgsConstructor
public class CafesService {

    private final CafesRepository cafesRepository;
    private final EntityManager em;

    public void updateStar (Long commentId, float newStar) {
        Cafes cafe = cafesRepository.getById(commentId);
        cafe.updateStar(newStar);
    }

    public List<CafesSearchResponseDto> getCafesList (String sorting, String dong, String filtering) {
        // 1. 선택한 동네의 모든 Cafes 리스트 가져오기
        List<Cafes> cafesListEntity = cafesRepository.findAllByDong(dong);

        // 2. 엔티티 리스트를 DTO 리스트로 변환하는 과정 (DTO 리스트에는 Long형 priorty 변수를 추가함 -> 1차 정렬에 활용하기 위해)
        List<CafesResponseDto> cafesListDto =
                cafesListEntity.stream().map(CafesResponseDto::new).collect(Collectors.toList());

        //3. 필터링 (1,2차) - 우선 순위
        boolean parking = checkFilter(filtering, "parking");
        boolean wifi = checkFilter(filtering, "wifi");
        //if (parking) subtractFiltering(filtering, "parking");
        //if (wifi) subtractFiltering(filtering, "wifi");

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


    //카페 상세보기
    public CafeDetailInfoDto getCafeDetail(Long cafeId, Long sessionId){
        CafeDetailInfoDto cafeDetailInfoDto = new CafeDetailInfoDto();
        cafeDetailInfoDto.setId(cafeId);

        Cafes cafe = cafesRepository.findById(cafeId).get();
        cafeDetailInfoDto.setName(cafe.getName());
        cafeDetailInfoDto.setImg_path(cafe.getImg_path());
        cafeDetailInfoDto.setPhone(cafe.getPhone());
        cafeDetailInfoDto.setTime(cafe.getTime());
        cafeDetailInfoDto.setMenu(cafe.getMenu());
        cafeDetailInfoDto.setStar(cafe.getStar());
        cafeDetailInfoDto.setCategory(cafe.getCategory());
        cafeDetailInfoDto.setAmericano(cafe.getAmericano());
        cafeDetailInfoDto.setDessert(cafe.getDessert());
        cafeDetailInfoDto.setParking(cafe.isParking());
        cafeDetailInfoDto.setWifi(cafe.isWifi());
        cafeDetailInfoDto.setLikesCount(cafe.getLikeList().size());//카페 좋아요 갯수
        cafe.getLikeList().forEach(likes -> {
            if(likes.getUsers().getId() == sessionId) cafeDetailInfoDto.setLikeState(true);//로그인한 아이디가 체크하였는지 확인
        });

        return cafeDetailInfoDto;
    }

    //myPageLikesList
    public Page<LikesListDto> getLikesCafe(Long sessionId, Pageable pageable){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT c.id, c.name, c.img_path ");//likesState long을 boolean으로, //count와 상태 넣어야함
        sb.append("FROM likes l, cafes c ");
        sb.append("WHERE l.cafe_id = c.id ");
        sb.append("AND c.id IN (SELECT c.id FROM likes l, cafes c WHERE l.user_id = ? AND c.id = l.cafe_id) ");
        sb.append("GROUP BY c.id ");
        sb.append("ORDER BY c.id");

        //쿼리완성
        Query query = em.createNativeQuery(sb.toString()).setParameter(1, sessionId);


        //JPA 쿼리 매핑 - DTO에 매핑
        JpaResultMapper result = new JpaResultMapper();
        List<LikesListDto> cafeLikesList = result.list(query, LikesListDto.class);

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize())>cafeLikesList.size() ? cafeLikesList.size() : (start + pageable.getPageSize());

        if(start > cafeLikesList.size()) return new PageImpl<LikesListDto>(cafeLikesList.subList(0,0),pageable,0);

        Page<LikesListDto> cafeLikesPage = new PageImpl<>(cafeLikesList.subList(start,end),pageable,cafeLikesList.size());
        return cafeLikesPage;
    }


}




