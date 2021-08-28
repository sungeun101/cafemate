package cafemate.back.service;

import cafemate.back.domain.Likes;
import cafemate.back.domain.Users;
import cafemate.back.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
public class LikesService {
    private final LikesRepository likesRepository;

    //좋아요
    public void likes(Long sessionId, Long cafeId){
        try{
            likesRepository.likes(sessionId,cafeId);
        }catch (Exception e){
            throw new RuntimeException("이미 좋아요 하였습니다.");
        }


    }

    //취소
    public void cancelLikes(Long sessionId, Long cafeId){
        likesRepository.cancelLikes(sessionId,cafeId);
    }


}
