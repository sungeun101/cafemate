package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter @Setter
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

}