package cafemate.back.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Cafes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)//like와 연동
    private Users users;
    private int viewCount;



    @NotNull
    private String img_path;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @NotNull
    private String location;

    private String phone;

    private String time;

    private String menu;

    private float star;

    private String category;

    private String area;

    private int americano;

    private String dessert;

    private boolean parking;

    private boolean wifi;

    private boolean animal;

    @JsonIgnoreProperties({"cafes"})
    @OneToMany(mappedBy = "cafes")
    private List<Likes> likes = new ArrayList<>();
}
