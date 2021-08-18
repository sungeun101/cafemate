package cafemate.back.service;


import cafemate.back.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LikesService {
    private final LikesRepository likesRepository;

    @Transactional
    public void likes(long sessionId, long cafeId){
        try{
            likesRepository.likes(sessionId,cafeId);
        }catch(Exception e){
        }
    }

    public void unLikes(long sessionId, long cafeId){
        likesRepository.unLikes(sessionId,cafeId);
    }
}
