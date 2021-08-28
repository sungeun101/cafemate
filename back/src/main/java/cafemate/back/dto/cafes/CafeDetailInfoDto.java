package cafemate.back.dto.cafes;

import cafemate.back.domain.Cafes;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class CafeDetailInfoDto {
    private Long id;
    private String name;
    private String img_path;
    private String phone;
    private String time;
    private String menu;
    private float star;
    private String category;
    private int americano;
    private String dessert;
    private boolean parking;
    private boolean wifi;
    private boolean likeState;
    private long likesCount;

    public CafeDetailInfoDto(Cafes cafes){
        this.id = cafes.getId();
        this.name = cafes.getName();
        this.img_path = cafes.getImg_path();
        this.phone = cafes.getPhone();
        this.time = cafes.getTime();
        this.menu = cafes.getMenu();
        this.star = cafes.getStar();
        this.category =cafes.getCategory();
        this.americano = cafes.getAmericano();
        this.dessert = cafes.getDessert();
        this.parking = cafes.isParking();
        this.wifi = cafes.isWifi();
        this.likeState = cafes.isLikeState();
        this.likesCount = cafes.getLikesCount();
    }

}
