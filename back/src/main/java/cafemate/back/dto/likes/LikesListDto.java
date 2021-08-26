package cafemate.back.dto.likes;

import lombok.*;

import java.math.BigInteger;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class LikesListDto {

    private Long id;
    private String name;
    private String img_path;

    public LikesListDto(BigInteger id, String name, String img_path){
        this.id = id.longValue();
        this.name = name;
        this.img_path = img_path;
    }
}