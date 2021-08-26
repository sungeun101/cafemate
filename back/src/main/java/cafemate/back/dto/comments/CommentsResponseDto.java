package cafemate.back.dto.comments;

import cafemate.back.domain.Comments;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CommentsResponseDto {
    private String content;
    private String img_path;
    private float star;
    private LocalDate createdAt;

    private Long cafeId;
    private Long userId;

    //엔티티를 받으면 DTO로 변환하기
    public CommentsResponseDto(Comments comment){
        this.content = comment.getContent();
        this.img_path = comment.getContent();
        this.star = comment.getStar();
        this.createdAt = comment.getCreatedAt();
        this.cafeId = comment.getCafes().getId();
        this.userId = comment.getUsers().getId();
    }
}
