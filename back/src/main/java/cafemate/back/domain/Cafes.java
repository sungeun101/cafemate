package cafemate.back.domain;

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

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cafe_id")
    private int id;

    @NotNull
    private String name;

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

//    @OneToMany(mappedBy = "cafes")
//    private List<Comments> comments = new ArrayList<>();

}
