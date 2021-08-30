package cafemate.back.dto.comments;

import cafemate.back.domain.Comments;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CommentsResponseDto {
    private Long id;
    private String content;
    private String img_path;
    private float star;
    private LocalDate createdAt;

    private Long cafe_id;
    private String user_id;

    //엔티티를 받으면 DTO로 변환하기
    public CommentsResponseDto(Comments comment){
        this.id = comment.getId();
        this.content = comment.getContent();
        this.img_path = comment.getImg_path();
        this.star = comment.getStar();
        this.createdAt = comment.getCreatedAt();
        this.cafe_id = comment.getCafes().getId();
        this.user_id = comment.getUsers().getId();
    }
}
