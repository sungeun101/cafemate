package cafemate.back.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter @Setter
public class Comments {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

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

    private LocalDate created_at;

}
