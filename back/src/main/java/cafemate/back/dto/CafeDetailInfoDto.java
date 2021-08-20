package cafemate.back.dto;

import com.sun.istack.NotNull;
import lombok.*;

import java.util.List;

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
    private double latitude;
    private double longitude;
    private String location;
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
    private boolean animal;
    private boolean likeState;



}
