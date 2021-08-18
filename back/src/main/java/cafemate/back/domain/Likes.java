package cafemate.back.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private Users users;

    @JoinColumn(name = "cafe_id")
    @ManyToOne
    private Cafes cafes;

    public Likes(Users users, Cafes cafes){
        this.users = users;
        this.cafes = cafes;
    }

}
