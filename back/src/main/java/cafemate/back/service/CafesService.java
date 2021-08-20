package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.dto.CafeDetailInfoDto;
import cafemate.back.dto.LikesListDto;
import cafemate.back.repository.CafesRepository;
import cafemate.back.repository.LikesRepository;
import cafemate.back.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

import org.qlrm.mapper.JpaResultMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CafesService {
    private final LikesRepository likesRepository;
    private final CafesRepository cafesRepository;
    private final UsersRepository usersRepository;
    private final EntityManager em;


    //카페 상세보기
    public CafeDetailInfoDto getCafeDetail(long cafeId, long sessionId){
        CafeDetailInfoDto cafeDetailInfoDto = new CafeDetailInfoDto();
        cafeDetailInfoDto.setId(cafeId);

        Cafes cafe = cafesRepository.findById(cafeId).get();
        cafeDetailInfoDto.setName(cafe.getName());
        cafeDetailInfoDto.setImg_path(cafe.getImg_path());
        cafeDetailInfoDto.setLatitude((cafe.getLatitude()));
        cafeDetailInfoDto.setLongitude(cafe.getLongitude());
        cafeDetailInfoDto.setLocation(cafe.getLocation());
        cafeDetailInfoDto.setPhone(cafe.getPhone());
        cafeDetailInfoDto.setTime(cafe.getTime());
        cafeDetailInfoDto.setMenu(cafe.getMenu());
        cafeDetailInfoDto.setStar(cafe.getStar());
        cafeDetailInfoDto.setCategory(cafe.getCategory());
        cafeDetailInfoDto.setArea(cafe.getArea());
        cafeDetailInfoDto.setAmericano(cafe.getAmericano());
        cafeDetailInfoDto.setDessert(cafe.getDessert());
        cafeDetailInfoDto.setParking(cafe.isParking());
        cafeDetailInfoDto.setWifi(cafe.isWifi());
        cafeDetailInfoDto.setAnimal(cafe.isAnimal());
        cafe.getLikeList().forEach(likes -> {
            if(likes.getUsers().getId() == sessionId) cafeDetailInfoDto.setLikeState(true);
        });

        return cafeDetailInfoDto;
    }

    //myPageLikesList
    public Page<LikesListDto> getLikesCafe(long sessionId, Pageable pageable){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT c.id, c.name, c.img_path");//likesState long을 boolean으로
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
