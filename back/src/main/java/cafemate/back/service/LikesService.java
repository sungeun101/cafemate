package cafemate.back.service;


import cafemate.back.domain.Cafes;
import cafemate.back.repository.LikesRepository;
import cafemate.back.repository.UsersRepository;
import cafemate.back.domain.Likes;
import cafemate.back.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class LikesService {
    private final LikesRepository likesRepository;

//    public List<Likes> getLikes(long userId) {
//        return likesRepository.findByUserId(userId);
//    }

//    private final UsersRepository usersRepository;
//
//
    public void likes(long sessionId, long cafeId) {
    try{//좋아요
        likesRepository.likes(sessionId, cafeId);
    }catch(Exception e){//눌렀는지 체크하기
        throw new RuntimeException("이미 좋아요 하였습니다");
    }
}
    //취소
    public void cancelLikes(long sessionId, long cafeId){
        likesRepository.cancelLikes(sessionId, cafeId);
    }


}
