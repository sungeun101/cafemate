package cafemate.back.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "likes",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "likes_uk",
                        columnNames = {"user_id","cafe_id"}
                )
        })
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users users;

    @JoinColumn(name = "cafe_id")
    @ManyToOne
    private Cafes cafes;

    @Builder
    public Likes(Users users, Cafes cafes){
        this.users = users;
        this.cafes = cafes;
    }

}
