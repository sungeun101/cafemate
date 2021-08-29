package cafemate.back.dto.comments;

import cafemate.back.domain.Comments;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentsRequestDto {
    private String content;
    private String img_path; //file형식
    private float star;

    private String user_id;
    private Long cafe_id;
}
