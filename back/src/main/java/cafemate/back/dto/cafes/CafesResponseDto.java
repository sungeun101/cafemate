package cafemate.back.dto.cafes;


import cafemate.back.domain.Cafes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class CafesResponseDto {
    // 메인
    private Long id;
    private String name;
    private String sub;
    private String img_path;
    private float star;
    private int starInt = (int) star;

    private String address;
    private double longitude;
    private double latitude;
    private String phone;
    private String time;
    private String menu;

    //분류용
    //private String dong;
    private int americano;
    private String category;
    private String dessert;
    private boolean parking;
    private boolean wifi;

    //우선순위
    private int priority;

    public CafesResponseDto(Cafes cafe) {
        this.id = cafe.getId();
        this.name = cafe.getName();
        this.sub = cafe.getSub();
        this.img_path = cafe.getImg_path();
        this.star = cafe.getStar();
        this.address = cafe.getAddress();
        this.longitude = cafe.getLongitude();
        this.latitude = cafe.getLatitude();
        this.phone = cafe.getPhone();
        this.time = cafe.getTime();
        this.menu = cafe.getMenu();
        //this.dong = cafe.getDong();

        this.americano = cafe.getAmericano();
        this.category = cafe.getCategory();
        this.dessert = cafe.getAddress();
        this.parking = cafe.isParking();
        this.wifi = cafe.isWifi();
        this.longitude = cafe.getLongitude();
        this.latitude = cafe.getLatitude();

    }


}
