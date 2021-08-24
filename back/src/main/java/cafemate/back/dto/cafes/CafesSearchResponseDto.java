package cafemate.back.dto.cafes;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CafesSearchResponseDto {
    // 메인
    private String name;
    private String sub;
    private String img_path;
    private String address;
    private float star;

    public CafesSearchResponseDto (CafesResponseDto cafesResponseDto) {
        this.name = cafesResponseDto.getName();
        this.sub = cafesResponseDto.getSub();
        this.img_path = cafesResponseDto.getImg_path();
        this.address = cafesResponseDto.getAddress();
        this.star = cafesResponseDto.getStar();
    }


}
