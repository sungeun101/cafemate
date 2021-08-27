package cafemate.back.dto.users;

import cafemate.back.domain.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String name;
    private String email;
    private String img_path;

    // DTO -> Entity
    // builder 코드를 줄이기위해서
    public Users toEntity(){
        return Users.builder()
                .email(email)
                .name(name)
                .img_path(img_path)
                .build();
    }
}