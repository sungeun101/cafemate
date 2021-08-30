package cafemate.back.service;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Likes;
import cafemate.back.domain.Users;
import cafemate.back.repository.CafesRepository;
import cafemate.back.repository.LikesRepository;
import cafemate.back.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class LikesService {
    private final LikesRepository likesRepository;
    private final UsersRepository usersRepository;
    private final CafesRepository cafesRepository;

    public void createLikes (String user_id, Long cafe_id) {
        Users user = usersRepository.getById(user_id);
        Cafes cafe = cafesRepository.getById(cafe_id);
        Likes like = Likes.builder().users(user).cafes(cafe).build();
        likesRepository.save(like);
    }

    public void deleteLikes (String user_id, Long cafe_id) {
        Cafes cafe = cafesRepository.getById(cafe_id);
        List<Likes> likesCafeList = likesRepository.findAllByCafes(cafe);
        Likes delLike = null;
        for (Likes i : likesCafeList) {
            if (i.getUsers().getId().equals(user_id)) {
                delLike = i;
            }
        }
        likesRepository.delete(delLike);
    }

    public List<Likes> getLikes (String user_id) {
        Users user = usersRepository.getById(user_id);
        List<Likes> likesList = likesRepository.findAllByUsers(user);
        return likesList;
    }

//    //좋아요
//    public void likes(String sessionId, Long cafeId){
//        try{
//            likesRepository.likes(sessionId,cafeId);
//        }catch (Exception e){
//            throw new RuntimeException("이미 좋아요 하였습니다.");
//        }
//    }
//
//    //취소
//    public void cancelLikes(String sessionId, Long cafeId){
//        likesRepository.cancelLikes(sessionId,cafeId);
//    }

}
