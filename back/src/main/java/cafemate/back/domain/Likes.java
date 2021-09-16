package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "likes")
public class Likes {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "cafe_id")
    private Cafes cafes;

    @Builder
    public Likes(Users users, Cafes cafes){
        this.users = users;
        this.cafes = cafes;
    }

}
