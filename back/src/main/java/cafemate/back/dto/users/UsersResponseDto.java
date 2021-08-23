package cafemate.back.dto.users;

import cafemate.back.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class UsersResponseDto {
    private Integer id;
    private String email;
    private String name;
    private String img_path;

    public UsersResponseDto(Users user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.img_path = user.getImg_path();
        this.name = user.getName();
    }
}