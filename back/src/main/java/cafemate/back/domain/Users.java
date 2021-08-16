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

    @Builder
    public Users(Integer id, String email, String name, String img_path) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.img_path = img_path;
    }

}