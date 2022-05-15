package cafemate.back.controller;

import cafemate.back.domain.Likes;
import cafemate.back.dto.likes.LikesListDto;
import cafemate.back.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
public class LikesController {

    private final LikesService likesService;

    // 찜한 카페 등록
    @PostMapping("/likes/{cafe-id}/{user-id}")
    public ResponseEntity createLikes( @PathVariable("cafe-id") Long cafeId ,
                                       @PathVariable("user-id") String userId ){
        likesService.createLikes(userId, cafeId);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 찜한 카페 취소
    @DeleteMapping("/likes/{cafe-id}/{user-id}")
    public ResponseEntity deleteLikes(@PathVariable("cafe-id") Long cafeId,
                                      @PathVariable("user-id") String userId){
        likesService.deleteLikes(userId , cafeId);
        return new ResponseEntity (HttpStatus.OK);
    }

    // 찜한 카페 조회 - 유저아이디로
    @GetMapping("/likes/users/{user-id}")
    public ResponseEntity<List<LikesListDto>> getLikesCafe(
                                                @PathVariable("user-id") String userId
                                                // @RequestParam(value = "page") Integer page
    )
    {
        List<Likes> likesList = likesService.getLikes(userId);
        List<LikesListDto> likesListDto = likesList.stream().map(LikesListDto::new).collect(Collectors.toList());

        return new ResponseEntity<>( likesListDto ,HttpStatus.OK);
    }
}
