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
    private int id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    private String img_path;

//    @OneToMany(mappedBy = "userComments")
//    private List<Comments> comments = new ArrayList<>();

    @OneToMany(mappedBy = "userLikes")
    private List<Likes> likes = new ArrayList<>();

}