package cafemate.back.dto.comments;

import cafemate.back.domain.Comments;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentsRequestDto {
    private String content;
    private String img_path;
    private float star;

    //엔티티를 받으면 DTO로 변환하기
    public CommentsRequestDto(Comments comment){
        this.content = comment.getContent();
        this.img_path = comment.getImg_path();
        this.star = comment.getStar();
    }
}
