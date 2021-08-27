package cafemate.back.service;

import cafemate.back.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LikesService {
    private final LikesRepository likesRepository;

    //좋아요
    public void likes(Long sessionId, Long cafeId){
        likesRepository.likes(sessionId,cafeId);
    }

    //취소
    public void cancelLikes(Long sessionId, Long cafeId){
        likesRepository.cancelLikes(sessionId,cafeId);
    }

}
