package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
public class Users {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    private String img_path;

//    @OneToMany(mappedBy = "userComments")
//    private List<Comments> comments = new ArrayList<>();

//    @OneToMany(mappedBy = "userLikes")
//    private List<Likes> likes = new ArrayList<>();

    @Builder //id는 자동생성이니까, 엔티티화할때 인자로 받을 필요없지만,
    //테스트 케이스에서 id가 자동생성이 안되서 일단 id 항목도 인자로 받게 함
    public Users(String email, String name, String img_path) {
        this.email = email;
        this.name = name;
        this.img_path = img_path;
    }

}