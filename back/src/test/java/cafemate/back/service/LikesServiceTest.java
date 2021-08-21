package cafemate.back.service;

import cafemate.back.domain.Likes;
import cafemate.back.repository.LikesRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LikesServiceTest {

    @Autowired
    private LikesRepository likesRepository;

    @Test
    public void create(){
        long cafe_id = 1;
        long user_id = 1;





    }

}
