package cafemate.back.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cafes")
@NoArgsConstructor
@Getter
public class Cafes {

    @Id //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cafe_id")
    private Long id;

    @NotNull
    private String name;

    private String sub;

    private String img_path;

    @NotNull
    private String dong;

    @NotNull
    private String address;

    @NotNull
    private double longitude;

    @NotNull
    private double latitude;

    private String phone;

    private String time;

    private String menu;

    private float star;

    private int americano;

    private String category;

    private String dessert;

    private boolean parking;

    private boolean wifi;

    @Transient
    private boolean likeState;

    @Transient
    private Long likesCount;

    //@JsonIgnoreProperties({"cafes"})
//    @OneToMany(mappedBy = "cafes")
//    private List<Likes> likeList;

    @OneToMany(mappedBy = "cafes") //fetch = FetchType.LAZY,
    private List<Comments> commentsCafes = new ArrayList<Comments>();

    @OneToMany(mappedBy = "cafes") //fetch = FetchType.LAZY,
    private List<Likes> commentsLikes = new ArrayList<>();

    public void updateStar(float newStar){
        int number = commentsCafes.size() +1;
        float averStar = (this.star+newStar) / number;
        this.star = Math.round((averStar)*10 /10.0);
    }

    @Builder
    public Cafes (Long id, String phone, String name, String dong,float star, String address, boolean parking, double longitude, double latitude) {
        this.id = id;
        this.name = name;
        this.dong = dong;
        this.star = star;
        this.address = address;
        this.parking = parking;
        this.longitude = longitude;
        this.latitude = latitude;
        this.phone = phone;
    }

    public void updateLikesCount(Long likesCount){
        this.likesCount = likesCount;
    }

    public void updateLikeState(boolean likeState){
        this.likeState = likeState;
    }

}