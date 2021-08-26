package cafemate.back.domain;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
public class Comments {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne// (fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users users;

    @ManyToOne //(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id")
    private Cafes cafes;

    @NotNull
    private String content;

    private String img_path;

    @NotNull
    private float star;

    private LocalDate createdAt;

    public void updateContent(String newContent, float newStar){
        this.content = newContent;
        this.star = newStar;
    }

    public void updateDate() {
        LocalDate date = LocalDate.now();
        String text = date.format(ISO_LOCAL_DATE);
        LocalDate parsedDate = LocalDate.parse(text, ISO_LOCAL_DATE);

        this.createdAt = parsedDate;
    }

    @Builder
    public Comments (String content, String img_path, float star, LocalDate createdAt, Users userComments, Cafes cafeComments ) {
        this.content = content;
        this.img_path = img_path;
        this.star = star;
        this.createdAt = createdAt;
        this.users = userComments;
        this.cafes = cafeComments;
    }

}
