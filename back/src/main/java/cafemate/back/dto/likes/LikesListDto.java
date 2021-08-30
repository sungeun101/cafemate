package cafemate.back.dto.likes;

import cafemate.back.domain.Likes;
import lombok.*;

import java.math.BigInteger;

@NoArgsConstructor
@Setter
@Getter
@Data
public class LikesListDto {

    private Long id;
    private String userId;
    private Long cafeId;


    public LikesListDto(Likes likes) {
        this.id = likes.getId();
        this.userId = likes.getUsers().getId();
        this.cafeId = likes.getCafes().getId();
    }
}
