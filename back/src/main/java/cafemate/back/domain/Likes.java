

package cafemate.back.domain;
//
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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

