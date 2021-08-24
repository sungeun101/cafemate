package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
public class Comments {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private Users user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "cafe_id")
//    private Cafes cafe;

    @NotNull
    private String content;

    private String img_path;

    @NotNull
    private float star;

    private LocalDate created_at;

    public void updateContent(String newContent, float newStar){
        this.content = newContent;
        this.star = newStar;
    }

    public void updateDate() {
        this.created_at = LocalDate.now();
    }

    @Builder
    public Comments (String content, String img_path, float star, LocalDate created_at,Users userComments,Cafes cafeComments ) {
        this.content = content;
        this.img_path = img_path;
        this.star = star;
        this.created_at = created_at;
        //this.user = userComments;
        //this.cafe = cafeComments;
    }

}