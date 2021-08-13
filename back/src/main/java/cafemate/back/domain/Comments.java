package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter @Setter
public class Comments {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private Users userComments;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "cafe_id")
//    private Cafes cafes;

    //@NotNull
    private String content;

    private String img_path;

    //@NotNull
    private float star;

    @Temporal(TemporalType.DATE)
    private Date created_at;

}
