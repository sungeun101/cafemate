package cafemate.back.dto.users;

import cafemate.back.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSaveRequestDto {
    private Integer id;
    private String name;
    private String email;
    private String img_path;

    public Users toEntity(){
        return Users.builder()
                .id(id)
                .email(email)
                .name(name)
                .img_path(img_path)
                .build();
    }
}