package cafemate.back.dto.cafes;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class CafeDetailInfoDto {
    private long id;
    private String name;
    private String img_path;
    private String phone;
    private String time;
    private String menu;
    private float star;
    private String category;
    private String area;
    private int americano;
    private String dessert;
    private boolean parking;
    private boolean wifi;
    private boolean likeState;
    private long likesCount;
}
