package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
//    private List<Comments> commentsUsers = new ArrayList<Comments>();

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
//    private List<Likes> likes = new ArrayList<>();

    @Builder
    public Users(String email, String name, String img_path) {
        this.email = email;
        this.name = name;
        this.img_path = img_path;
    }

}