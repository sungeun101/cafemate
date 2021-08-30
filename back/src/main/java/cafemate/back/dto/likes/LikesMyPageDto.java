package cafemate.back.dto.likes;


import cafemate.back.domain.Cafes;
import cafemate.back.domain.Users;
import lombok.*;

import java.math.BigInteger;

@NoArgsConstructor
@Setter
@Getter
@Data
public class LikesMyPageDto {

    private Long id;
    private Long cafe_id;
    private String user_id;

    @Builder
    public LikesMyPageDto(Long id, Long cafe_id, String user_id){
        this.id = id;
        this.cafe_id = cafe_id;
        this.user_id = user_id;
    }

}
