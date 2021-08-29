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

    @Id //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private String id; //고유키값이 아닌, 구글아이디

    @NotNull
    private String name;

    @NotNull
    private String email;

    private String img_path;

    @OneToMany(mappedBy = "users") //fetch = FetchType.LAZY,
    private List<Comments> commentsUsers = new ArrayList<Comments>();

    @OneToMany( mappedBy = "users") //fetch = FetchType.LAZY,
    private List<Likes> likes = new ArrayList<Likes>();

    @Builder
    public Users(String id, String email, String name, String img_path) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.img_path = img_path;
    }

}