package cafemate.back.dto.cafes;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CafesSearchResponseDto {
    // 메인
    private Long id;
    private String name;
    private String sub;
    private String img_path;
    private String address;
    private double longitude;
    private double latitude;
    private float star;
    private String phone;
    private String time;
    private String menu;

    public CafesSearchResponseDto (CafesResponseDto cafesResponseDto) {
        this.id = cafesResponseDto.getId();
        this.name = cafesResponseDto.getName();
        this.sub = cafesResponseDto.getSub();
        this.img_path = cafesResponseDto.getImg_path();
        this.address = cafesResponseDto.getAddress();
        this.star = cafesResponseDto.getStar();
        this.longitude = cafesResponseDto.getLongitude();
        this.latitude = cafesResponseDto.getLatitude();
        this.phone = cafesResponseDto.getPhone();
        this.time = cafesResponseDto.getTime();
        this.menu = cafesResponseDto.getMenu();
    }


}
